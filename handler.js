"use strict";
const fs = require("fs");
const AWS = require("aws-sdk");
const { successResponse, getS3Object, uploadtoS3 } = require("./utils");
const { s3FileKeyValidator } = require("./validators");

const ffmpeg = require("fluent-ffmpeg");
const stream = require("stream");
const ffmpegPath = "/usr/bin/ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

AWS.config.update({ region: "us-east-1" });
var JSONParse = require("json-parse-safe");

module.exports.uploadAudio = async (event) => {
  try {
    const S3_BUCKET = process.env.S3_BUCKET;

    const body = JSONParse(event.body);
    const { error, value } = await s3FileKeyValidator(body.value);

    if (error) {
      return successResponse(false, error);
    }

    const { file_key } = value;

    const fileData = await getS3Object(S3_BUCKET, file_key);

    const inputBuffer = fileData.Body;
    const inputStream = new stream.PassThrough();
    inputStream.end(inputBuffer);

    const outputStream = new stream.PassThrough();
    const outputKey = file_key.replace(/\.[^/.]+$/, ".mp3");

    const ffmpegProcess = ffmpeg(inputStream)
      .format("mp3")
      .audioCodec("libmp3lame")
      .on("error", (error) => {
        console.error("Error during conversion: ", error);
        throw new Error("Failed to convert file.");
      });

    let outputBuffer = Buffer.alloc(0);
    outputStream.on("data", (chunk) => {
      outputBuffer = Buffer.concat([outputBuffer, chunk]);
    });

    ffmpegProcess.pipe(outputStream, { end: true });

    await new Promise((resolve, reject) => {
      outputStream.on("end", resolve);
      outputStream.on("error", reject);
    });

    const uploadFile = await uploadtoS3(S3_BUCKET, outputKey, outputBuffer);

    return await successResponse(
      true,
      "file converted and upload to s3 bucket successfully.",
      uploadFile
    );
  } catch (error) {
    console.log("🚀 ~ module.exports.uploadAudio= ~ error:", error);
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: false,
        message: "Error while to convert file.",
      }),
    };
  }
};

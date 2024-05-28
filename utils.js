// utils.js
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const fs = require("fs");

async function uploadtoS3(destBucketName, newKey, resultedbuffer) {
  try {
    const new_file_key = newKey.replace(/(\.[^.]+$|$)/, ".mp3");
    const s3_obj = await s3
      .upload({
        Bucket: `${destBucketName}`,
        Key: `${newKey}`,
        Body: resultedbuffer,
      })
      .promise();

    s3_obj.old_key = newKey;
    return s3_obj;
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: false,
        message: "Failed to upload file.",
        error: err.message,
      }),
    };
  }
}

async function successResponse(status, message, data) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: status,
      message: message,
      data: data,
    }),
  };
}

async function getS3Object(bucketName, key) {
  const getObjectParams = {
    Bucket: `${bucketName}`,
    Key: `${key}`,
  };
  try {
    const s3_obj = await s3.getObject(getObjectParams).promise();
    return s3_obj;
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: false,
        message: "Failed to getting file.",
        error: err.message,
      }),
    };
  }
}

module.exports = {
  uploadtoS3,
  successResponse,
  getS3Object,
};

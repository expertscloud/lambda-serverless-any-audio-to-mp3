const Joi = require("joi");

function createDynamicValidator(rules) {
  return async function validate(body) {
    const licenseInfoSchema = Joi.object(rules).strict().unknown(false);
    const { error, value } = licenseInfoSchema.validate(body);

    if (error && error.details) {
      const unknownError = error.details.find(
        (detail) => detail.type === "object.unknown"
      );
      if (unknownError) {
        return {
          error: `Allowed parameters [${Object.keys(rules).join(", ")}]`,
        };
      }
    }
    return {
      error: error ? error.details[0].message : null,
      value: value,
    };
  };
}

const s3FileKeyValidator = createDynamicValidator({
  file_key: Joi.string().required().messages({
    "any.required": "File key is required",
  }),
});

module.exports = {
  s3FileKeyValidator,
};

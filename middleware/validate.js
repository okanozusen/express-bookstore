const Ajv = require("ajv");

function validate(schema) {
  return (req, res, next) => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema, req.body);

    if (!isValid) {
      return res.status(400).json({
        error: "Validation failed",
        details: ajv.errors,
      });
    }
    next();
  };
}

module.exports = validate;

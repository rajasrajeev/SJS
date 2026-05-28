const errorFunction = require("../utils/schema_error.util");

const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            res.status(406);
            return res.json(
                errorFunction(true, `Error in payload : ${error.message}`)
            );
        } else {
            next();
        }
    };
};

module.exports = validate;

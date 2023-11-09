"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genValidationMiddleware = void 0;
const genValidationMiddleware = (schema) => {
    const validationMiddleware = (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            console.error("Validation Error:", error);
            throw new Error(error.message);
        }
        next();
    };
    return validationMiddleware;
};
exports.genValidationMiddleware = genValidationMiddleware;

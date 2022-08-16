import joi from 'joi';

export const userValidation = joi.object({
    email: joi
        .string().email()
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email is not valid',
            'any.required': 'Email is required'
        }),
    password: joi
        .string()
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required'
        }),
    properties: joi.optional()
}).messages({
    'object.base': 'Properties must be an object',
    'object.empty': 'Properties cannot be empty',
    'object.unknown': 'One or more properties are not allowed'
});
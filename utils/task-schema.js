//Si lo que ingresamos en el POST corresponde al esquema que se definio
const Joi = require('joi');

const taskSchema = {
    name: Joi.string().min(3).required(),
    state: Joi.string().min(3).required(),
    completed: Joi.boolean()
};

exports.validateTask = (task) => Joi.validate(task, taskSchema);


import { Joi, Segments } from "celebrate";
import { TAGS } from "../constants/tags.js";
import { isValidObjectId } from 'mongoose';



export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be at least {#limit}",
    }),

    perPage: Joi.number()
      .integer()
      .min(5)
      .max(20)
      .default(10)
      .messages({
      "number.base": "perPage must be a number",
      "number.min": "perPage must be at least {#limit}",
      "number.max": "perPage must be at most {#limit}",
    }),

    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
      "string.base": " Tag must be a string",
      "any.only": `Tag must be one of: ${TAGS.join(", ")}`,
    }),

    search: Joi.string()
      .allow('')
      .trim()
      .optional()
     .messages({
    "string.base": "Search must be a string",
     }),

  })
};

// Кастомний валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};


export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(objectIdValidator)
      .required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1),
    content: Joi.string().allow(""),
   tag: Joi.string().valid(...TAGS),

  }).min(1), // тіло не може бути порожнім
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required(),
    content: Joi.string().allow(""),
    tag: Joi.string().valid(...TAGS),
  }),
};

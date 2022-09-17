import joi from "joi";

export const testSchema = joi.object({
  name: joi.string().trim().required(),
  pdfUrl: joi.string().trim().required(),
  category: joi.string().trim().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required(),
});

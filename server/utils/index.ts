import { ZodError } from "zod";

export async function validationError(error: ZodError) {
  const fieldErrors = error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  throw createError({
    data: fieldErrors,
    message: "Validation Error",
  });
}

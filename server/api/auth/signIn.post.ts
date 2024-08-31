import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default defineEventHandler(async (event) => {
  const { error, data } = await readValidatedBody(
    event,
    signInSchema.safeParse
  );

  if (error) {
    await validationError(error);
  }

  const cleanedData = {
    password: data.password,
    email: data.email,
  };

  const { signIn } = useFirebase();

  const { data: userData, error: userError } = await signIn({
    ...cleanedData,
  });

  if (userError) {
    throw createError({
      message: "Failed while signing the user in",
    });
  }

  return {
    data: {
      ...userData,
    },
  };
});

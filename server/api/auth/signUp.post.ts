import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
});

export default defineEventHandler(async (event) => {
  const { error, data } = await readValidatedBody(
    event,
    signUpSchema.safeParse
  );

  if (error) {
    await validationError(error);
  }

  const cleanedData = {
    firstName: data.firstName,
    password: data.password,
    email: data.email,
    lastName: data.lastName,
  };

  const { signUp, createDoc, deleteAccount } = useFirebase();

  const { data: userData, error: userError } = await signUp({
    ...cleanedData,
  });

  if (userError) {
    throw createError({
      message: "Failed while signing the user up",
    });
  }

  const { data: createUserData, error: createUserError } = await createDoc({
    collectionName: "users",
    data: userData.user,
    id: userData.user.id,
  });

  if (createUserError) {
    await deleteAccount({ uId: userData.user.id });
    throw createError({
      message: "Failed while storing the user data",
    });
  }
  return {
    data: { ...createUserData },
  };
});

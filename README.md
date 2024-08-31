├── /api
│ ├── /v1
│ │ ├── /posts
│ │ │ ├── index.get.ts # Get all posts
│ │ │ ├── index.post.ts # Create a new post
│ │ │ ├── /[id]
│ │ │ │ ├── index.get.ts # Get a specific post by ID
│ │ │ │ ├── index.put.ts # Update a post by ID
│ │ │ │ ├── index.delete.ts # Delete a post by ID
│ │ │ │ ├── /comments
│ │ │ │ │ ├── index.get.ts # Get all comments for a post
│ │ │ │ │ ├── index.post.ts # Add a comment to a post
│ ├── /auth
│ │ ├── register.post.ts # Register a new user
│ │ ├── login.post.ts # Login a user
│ │ ├── profile.get.ts # Get user profile (authenticated route)
├── /middlewares
│ ├── authenticate.ts # Firebase authentication middleware
├── /plugins
│ ├── firebase.ts # Initialize Firebase on the server
├── /utils
│ ├── /firebase
│ │ ├── firestore.ts # Firestore utility functions
│ │ ├── authentication.ts # Firebase Auth utility functions
│ │ ├── index.ts # General Firebase utility functions
│ ├── index.ts # General utility functions
├── /types
│ ├── index.ts # Type definitions
├── nitro.config.ts # Nitro configuration
└── tsconfig.json # TypeScript configuration


import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { error, data } = await readValidatedBody(
    event,
    signUpSchema.safeParse
  );

  if (error) {
    const fieldErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw createError({
      data: fieldErrors,
      message: "Validation Error",
    });
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

const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
});

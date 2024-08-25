import { getAuth } from "firebase-admin/auth";
import { Login, Register } from "~~/types";

const auth = getAuth();

// function to create or signUp users
async function signUp(data: Register) {
  try {
    const createdUser = await auth.createUser({
      displayName: `${data.firstName.toLowerCase()} ${data.lastName.toLowerCase()}`,
      email: data.email.toLowerCase(),
      password: data.password,
    });

    return {
      data: {
        id: createdUser.uid,
        displayName: createdUser.displayName,
        email: createdUser.email,
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

// function to singIn users
async function signIn(data: Login) {
  const { apiKey } = useRuntimeConfig();
  //
  try {
    const response = await $fetch<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        },
      }
    );
    return {
      data: {
        token: response.idToken,
        email: response.email,
        displayName: response.displayName,
      },
    };
  } catch (error) {
    return { error: error.response?.data?.error?.message || error.message };
  }
}

// function to delete account
async function deleteAccount({ uId }: { uId: string }) {
  try {
    await auth.deleteUser(uId);
    return {
      data: {
        id: uId,
        deleted: true,
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

// function to set role
async function setRole({ uId, role }: { uId: string; role: string }) {
  try {
    auth.setCustomUserClaims(uId, {
      role,
    });

    return {
      data: {
        id: uId,
        role: "Role has be set",
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export default {
  signIn,
  signUp,
  setRole,
  deleteAccount,
};

// import auth from firebase-admin
import { getAuth } from "firebase-admin/auth";
import { Register, Login } from "~~/types";

const auth = getAuth();
// create the signUp function
async function signUp({ data }: { data: Register }) {
  try {
    await auth.createUser({
      displayName: `${data.firstName} ${data.lastName}`,
      password: data.password,
      email: data.email,
    });
    return {
      data: {
        message: "User has signed up successfully",
      },
    };
  } catch (error) {
    return { error };
  }
}
// create the signIn function
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

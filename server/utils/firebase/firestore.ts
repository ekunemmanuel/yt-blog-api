// import firestore from firebase-admin
import { getFirestore } from "firebase-admin/firestore";

// create a firestore instance
const db = getFirestore();

// get all the docs in a collection
async function getDocs<T>({ collectionName }: { collectionName: string }) {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as T;
    });
    return {
      data,
    };
  } catch (error) {
    return { error };
  }
}

// get a single in a collection using the doc id
async function getDoc<T>({
  collectionName,
  id,
}: {
  collectionName: string;
  id: string;
}) {
  try {
    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) {
      throw new Error(`Doc with the id ${id} is not found`);
    }
    return {
      data: {
        id: doc.id,
        ...doc.data(),
      } as T,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

// create a doc in a collection with or without an id
async function createDoc({
  collectionName,
  data,
  id,
}: {
  collectionName: string;
  data: any;
  id?: string;
}) {
  try {
    const docRef = id
      ? db.collection(collectionName).doc(id)
      : db.collection(collectionName).doc();
    await docRef.set({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return {
      data: {
        message: "Document successfully created",
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

// update a doc in a collection using the doc id
async function updateDoc({
  collectionName,
  id,
  data,
}: {
  collectionName: string;
  id: string;
  data: any;
}) {
  try {
    const docRef = db.collection(collectionName).doc(id);
    await docRef.update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return {
      data: {
        message: "Document successfully updated",
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

// delete a doc in a collection using the doc id
async function deleteDoc({
  collectionName,
  id,
}: {
  collectionName: string;
  id: string;
}) {
  try {
    const docRef = db.collection(collectionName).doc(id);
    await docRef.delete();
    return {
      data: {
        message: "Document successfully deleted",
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export default {
  createDoc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
};

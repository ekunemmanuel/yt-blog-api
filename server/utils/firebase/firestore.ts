import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

// function to get all the document from a collection in firestore
async function getDocs<T>({ collectionName }: { collectionName: string }) {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as T),
      };
    });
    return {
      data,
    };
  } catch (error) {
    return { error };
  }
}

// function to get a single doc using the id
async function getDoc<T>({
  collectionName,
  docId,
}: {
  collectionName: string;
  docId: string;
}) {
  try {
    const doc = await db.collection(collectionName).doc(docId).get();
    if (!doc.exists)
      throw new Error(`Document with ID ${docId} does not exist`);
    return {
      data: {
        id: doc.id,
        ...(doc.data() as T),
      },
    };
  } catch (error) {
    return { error };
  }
}

// function to create a doc in firestore
async function createDoc({
  collectionName,
  data,
  docId,
}: {
  collectionName: string;
  data: any;
  docId?: string;
}) {
  try {
    const docRef = docId
      ? db.collection(collectionName).doc(docId)
      : db.collection(collectionName).doc();

    await docRef.set({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return {
      data: {
        id: docRef.id,
        ...data,
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

// updata a doc in firestore
async function updateDoc<T>({
  collectionName,
  docId,
  data,
}: {
  collectionName: string;
  docId: string;
  data: any;
}) {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.update(data);
    const doc = await docRef.get();
    return {
      data: {
        id: docRef.id,
        ...(doc.data() as T),
      },
    };
  } catch (error) {}
}

// function to delete from firestore
async function deleteDoc({
  collectionName,
  docId,
}: {
  collectionName: string;
  docId: string;
}) {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.delete();
    return {
      data: {
        id: docRef.id,
        deleted: true,
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export default {
  getDocs,
  getDoc,
  createDoc,
  updateDoc,
  deleteDoc,
};

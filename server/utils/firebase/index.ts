import firestore from "./firestore";
import authentication from "./authentication";

export function useFirebase() {
  return {
    ...firestore,
    ...authentication,
  };
}

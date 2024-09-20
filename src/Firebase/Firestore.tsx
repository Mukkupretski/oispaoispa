import { ReactElement } from "react";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";

export default function Firestore({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const firebase = getFirestore(useFirebaseApp());

  return <FirestoreProvider sdk={firebase}>{children}</FirestoreProvider>;
}

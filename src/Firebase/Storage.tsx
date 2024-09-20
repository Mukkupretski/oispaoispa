import { ReactElement } from "react";
import { StorageProvider, useFirebaseApp } from "reactfire";
import { getStorage } from "firebase/storage";

export default function Storage({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const firebase = getStorage(useFirebaseApp());

  return <StorageProvider sdk={firebase}>{children}</StorageProvider>;
}

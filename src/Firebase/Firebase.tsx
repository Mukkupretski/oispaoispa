import { ReactElement } from "react";
import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyCQh5Na_efSjpiPJDTbUYokFwbpq5qNMLk",
  authDomain: "oispaoispa.firebaseapp.com",
  projectId: "oispaoispa",
  storageBucket: "oispaoispa.appspot.com",
  messagingSenderId: "400525875476",
  appId: "1:400525875476:web:e2b477068fb2117be74a01",
};
export default function Firebase({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {children}
    </FirebaseAppProvider>
  );
}

import { ReactElement } from "react";
import Loading from "./Components/Loading";
import NotFound from "./Components/NotFound";

export default function MainPage(): ReactElement {
  return (
    <>
      <NotFound width={100}></NotFound>
      <Loading width={100}></Loading>
    </>
  );
}

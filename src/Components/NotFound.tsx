import { ReactElement } from "react";
import "../Game/Styles/loaderror.css";

export default function NotFound({ width }: { width: number }): ReactElement {
  return (
    <div className="notfound">
      <DummyGrid width={width}></DummyGrid>
      <div></div>
    </div>
  );
}
export function DummyGrid({ width }: { width: number }) {
  return (
    <div
      className="dummygrid"
      style={{
        gridTemplateRows: `${width / 2 - (3 * width) / 32}px ${
          width / 2 - (3 * width) / 32
        }px`,
        gridTemplateColumns: `${width / 2 - (3 * width) / 32}px ${
          width / 2 - (3 * width) / 32
        }px`,
        width: `${width}px`,
        borderRadius: `${width / 8}px`,
        gap: `${width / 32}px`,
        padding: `${width / 16}px`,
      }}
    >
      <div
        className="dum"
        style={{
          borderRadius: `${width / 16}px`,
        }}
      ></div>
      <div
        className="dum"
        style={{
          borderRadius: `${width / 16}px`,
        }}
      ></div>
      <div
        className="dum"
        style={{
          borderRadius: `${width / 16}px`,
        }}
      ></div>
      <div
        className="dum"
        style={{
          borderRadius: `${width / 16}px`,
        }}
      ></div>
    </div>
  );
}

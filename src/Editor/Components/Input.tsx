import { CSSProperties, ReactElement } from "react";

type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  id: string;
  style?: CSSProperties;
  label: string;
  style2?: boolean;
};

export default function Input({
  onChange,
  value,
  id,
  style,
  label,
  style2,
}: InputProps): ReactElement {
  return (
    <div className="inputcontainer">
      <label className="text-1" htmlFor={id}>
        {label}
      </label>
      <input
        className={style2 ? "editorinput2" : "editorinput"}
        type="text"
        onChange={onChange}
        value={value}
        id={id}
        style={{ ...style, marginTop: style2 ? "5px" : "0px" }}
      ></input>
    </div>
  );
}

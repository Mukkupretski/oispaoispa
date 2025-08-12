import { ReactElement } from "react";

type InputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  id: string;
  label: string;
};

export default function ColorPicker({
  onChange,
  value,
  id,
  label,
}: InputProps): ReactElement {
  return (
    <div className="colorcontainer">
      <label className="text-1" htmlFor={id}>
        {label}
      </label>

      <input
        className="editorcolorpicker"
        type="color"
        onChange={onChange}
        value={value}
        id={id}
      ></input>
    </div>
  );
}

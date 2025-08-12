import { ReactElement, useState } from "react";

type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: boolean;
  id: string;
  label: string;
};

export default function Checkbox({
  onChange,
  value,
  id,
  label,
}: InputProps): ReactElement {
  const [showmark, setShowmark] = useState<boolean>(value === true);
  return (
    <div className="checkboxcontainer">
      <label className="text-1" htmlFor={id}>
        {label}
      </label>
      <div>
        <input
          className="editorcheckbox"
          type="checkbox"
          onChange={(e) => {
            onChange?.(e);
            setShowmark(e.target.checked);
          }}
          checked={value}
          id={id}
        ></input>
        {showmark ? <div className="checkmark"></div> : <></>}
      </div>
    </div>
  );
}

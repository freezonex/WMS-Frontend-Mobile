import { Input } from "antd-mobile";
import { CSSProperties, FocusEventHandler } from "react";
interface ICusInput {
  id?: string;
  name?: string;
  value: any;
  setValue: (val: any, id: string) => void;
  placeholder?: string;
  styleWrapper?: CSSProperties | undefined;
  styleInput?: CSSProperties | undefined;
  onBlur?: FocusEventHandler<HTMLElement>;
}
export default function CusInput({
  id,
  name,
  value,
  setValue,
  placeholder,
  styleWrapper,
  styleInput: stypeInput,
  onBlur,
}: ICusInput) {
  return (
    <div className="cus-input" style={styleWrapper}>
      {name && <p className="name">{name}</p>}
      <div className="bg-white">
        <Input
          style={stypeInput}
          id={id}
          placeholder={placeholder ? placeholder : name}
          value={value}
          onChange={(val) => setValue(val, id ? id : "")}
          onBlur={onBlur}
          clearable
        />
      </div>
    </div>
  );
}

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
  refInput?: any;
  type?: string;
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
  refInput,
  type="text",
}: ICusInput) {
  return (
    <div className="cus-input" style={styleWrapper}>
      {name && <p className="name">{name}</p>}
      <div className="bg-white">
        <Input
          ref={(ref) => {
            if (refInput) refInput.current = ref;
          }}
          style={stypeInput}
          id={id}
          type={type}
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

import { Input } from "antd-mobile";
interface ICusInput {
  id?: string;
  name: string;
  value: any;
  setValue: (val: any, id: string) => void;
  placeholder?: string;
}
export default function CusInput({
  id,
  name,
  value,
  setValue,
  placeholder,
}: ICusInput) {
  return (
    <div className="cus-input">
      <p className="name">{name}</p>
      <div className="bg-white">
        <Input
          id={id}
          placeholder={placeholder ? placeholder : name}
          value={value}
          onChange={(val) => setValue(val, id ? id : "")}
          clearable
        />
      </div>
    </div>
  );
}

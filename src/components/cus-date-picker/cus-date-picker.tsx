import { DateTimeFormat } from "@/utils/constant";
import { Calendar } from "@carbon/icons-react";
import { CalendarPicker, Input } from "antd-mobile";
import { CloseCircleOutline } from "antd-mobile-icons";
import moment from "moment";
import { CSSProperties, useRef, useState } from "react";
interface ICusDatePicker {
  id?: string;
  name?: string;
  value: any;
  defaultValue?: string;
  setValue: (val: any, id: string) => void;
  placeholder?: string;
  wrapperStyle?: CSSProperties;
}
export default function CusDatePicker({
  id,
  name,
  value,
  defaultValue,
  setValue,
  placeholder,
  wrapperStyle,
}: ICusDatePicker) {
  const [showCalendar, setShowCalendar] = useState(false);
  const inputRef = useRef<HTMLElement | any>();
  const handleShowDatePicker = () => {
    setShowCalendar(true);
    inputRef.current.blur();
  };
  const clearDate = (id: any) => {
    setValue(null, id);
  };
  return (
    <div className="cus-input" style={wrapperStyle}>
      {name && <p className="name">{name}</p>}
      <div className="bg-white relative">
        <Input
          ref={(ref) => {
            inputRef.current = ref;
          }}
          id={id}
          placeholder={placeholder ? placeholder : name}
          value={
            value ? moment(value).format(DateTimeFormat.ShortDateTime) : ""
          }
          onChange={(val) => setValue(val, id ? id : "")}
          clearable
          onClick={handleShowDatePicker}
          onFocus={handleShowDatePicker}
        />
        <Calendar
          fontSize={18}
          className="top-2 right-8 absolute"
          onClick={handleShowDatePicker}
        />
        <CloseCircleOutline
          fontSize={18}
          className="right-2 absolute"
          style={{ top: "7px" }}
          onClick={(e) => {
            e.preventDefault;
            clearDate(id);
          }}
        ></CloseCircleOutline>
      </div>
      <CalendarPicker
        visible={showCalendar}
        selectionMode="single"
        onChange={(val) => {
          setValue(val, id ? id : "");
        }}
        min={new Date(moment().add(-6, "months").format("YYYY-MM-DD HH:mm:ss"))}
        onClose={() => setShowCalendar(false)}
        onMaskClick={() => setShowCalendar(false)}
      />
    </div>
  );
}

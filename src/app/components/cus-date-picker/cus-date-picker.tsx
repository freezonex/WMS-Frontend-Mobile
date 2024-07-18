import { DateTimeFormat } from "@/utils/constant";
import { Calendar } from "@carbon/icons-react";
import { CalendarPicker, Input } from "antd-mobile";
import moment from "moment";
import { useRef, useState } from "react";
interface ICusDatePicker {
  id?: string;
  name: string;
  value: any;
  defaultValue?: string;
  setValue: (val: any, id: string) => void;
  placeholder?: string;
}
export default function CusDatePicker({
  id,
  name,
  value,
  defaultValue,
  setValue,
  placeholder,
}: ICusDatePicker) {
  const [showCalendar, setShowCalendar] = useState(false);
  const inputRef = useRef<HTMLElement | any>();
  const handleShowDatePicker = () => {
    setShowCalendar(true);
    inputRef.current.blur();
  };
  return (
    <div className="cus-input">
      <p className="name">{name}</p>
      <div className="bg-white relative">
        <Input
          ref={(ref) => {
            inputRef.current = ref;
          }}
          id={id}
          placeholder={placeholder ? placeholder : name}
          value={moment(value).format(DateTimeFormat.ShortDateTime)}
          onChange={(val) => setValue(val, id ? id : "")}
          clearable
          onClick={handleShowDatePicker}
          onFocus={handleShowDatePicker}
        />
        <Calendar
          className=" top-3 right-3 absolute"
          onClick={handleShowDatePicker}
        />
      </div>
      <CalendarPicker
        visible={showCalendar}
        selectionMode="single"
        onChange={(val) => {
          setValue(val, id ? id : "");
        }}
        onClose={() => setShowCalendar(false)}
        onMaskClick={() => setShowCalendar(false)}
      />
    </div>
  );
}

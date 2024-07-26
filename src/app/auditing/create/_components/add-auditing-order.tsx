import CusDatePicker from "@/app/components/cus-date-picker/cus-date-picker";
import CusInput from "@/app/components/cus-input/cus-input";
import { operationStatuses, stokingTypes } from "@/utils/constant";
import { Button } from "antd-mobile";

export default function AddAuditingOrder({
  formValue,
  setFormValues,
  onNext,
  onCancel,
}: any) {
  const handleSetFormValues = (val: any, id: string) => {
    console.log(val, id);
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [id]: val,
    }));
  };

  return (
    <div>
      <div className="mt-6">
        <p className="mb-2">Auditing Type</p>
        <select
          value={formValue.type}
          onChange={(e) => handleSetFormValues(e.target.value, "type")}
        >
          {stokingTypes.map((item, index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
      <CusInput
        id="source"
        name="Source"
        value={formValue.source}
        setValue={handleSetFormValues}
      ></CusInput>
      <CusDatePicker
        id="delivery_date"
        name="Delivery Date"
        value={formValue.delivery_date}
        setValue={handleSetFormValues}
      ></CusDatePicker>
      <div className="mt-6">
        <p className="mb-2">Status</p>
        <select
          value={formValue.status}
          onChange={(e) => handleSetFormValues(e.target.value, "status")}
        >
          {operationStatuses.map((item, index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex flex-row justify-center gap-4 pb-8">
        <Button color="primary" onClick={onNext}>
          Next
        </Button>
        <Button color="primary" fill="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

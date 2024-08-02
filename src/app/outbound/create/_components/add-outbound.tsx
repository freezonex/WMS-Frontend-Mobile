import CusDatePicker from "@/components/cus-date-picker/cus-date-picker";
import CusInput from "@/components/cus-input/cus-input";
import { operationStatuses } from "@/utils/constant";
import { Button } from "antd-mobile";

export default function AddOutboundCard({
  formValue,
  setFormValues,
  onNext,
  onCancel,
}: any) {
  const handleSetFormValues = (val: any, id: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [id]: val,
    }));
  };
  return (
    <div>
      <CusInput
        id="creator"
        name="Creator"
        value={formValue.creator}
        setValue={handleSetFormValues}
      ></CusInput>
      <CusInput
        id="purchase_order_no"
        name="Purchase Order No"
        value={formValue.purchase_order_no}
        setValue={handleSetFormValues}
      ></CusInput>
      <CusInput
        id="supplier"
        name="Supplier"
        value={formValue.supplier}
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
          <option className="placeholder" value="" disabled>
            Status
          </option>
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

import CusDatePicker from "@/components/cus-date-picker/cus-date-picker";
import CusInput from "@/components/cus-input/cus-input";
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
      <CusInput
        id="status"
        name="Status"
        value={formValue.status}
        setValue={handleSetFormValues}
      ></CusInput>
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

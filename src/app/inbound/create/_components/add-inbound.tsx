import CusDatePicker from "@/app/components/cus-date-picker/cus-date-picker";
import CusInput from "@/app/components/cus-input/cus-input";
import { Button } from "antd-mobile";

export default function AddInboundCard({
  formValue,
  setFormValues,
  onNext,
  onCancel,
}: any) {
  const handlerSetFormValues = (val: any, id: string) => {
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
        setValue={handlerSetFormValues}
      ></CusInput>
      <CusInput
        id="purchase_order_no"
        name="Purchase Order No"
        value={formValue.purchase_order_no}
        setValue={handlerSetFormValues}
      ></CusInput>
      <CusInput
        id="supplier"
        name="Supplier"
        value={formValue.supplier}
        setValue={handlerSetFormValues}
      ></CusInput>
      <CusDatePicker
        id="delivery_date"
        name="Delivery Date"
        value={formValue.delivery_date}
        setValue={handlerSetFormValues}
      ></CusDatePicker>
      <CusInput
        id="status"
        name="Status"
        value={formValue.status}
        setValue={handlerSetFormValues}
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

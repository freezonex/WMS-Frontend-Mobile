"use client";
import CusInput from "@/app/components/cus-input/cus-input";
import PageHeader from "@/app/components/page-header/page-header";
import { Button, Toast } from "antd-mobile";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addStorageLocation } from "@/actions/storage";

interface IParams {
  params: {
    whid: string;
  };
}
export default function CreateLocation({ params }: IParams) {
  const router = useRouter();
  const [formValue, setFormValues] = useState({
    name: "",
    material: "",
    quantity: "",
  });

  const handleSetFormValues = (val: any, id: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: val,
    }));
  };

  const handleSave = () => {
    console.log(formValue);
    const body = {
      warehouse_id: params.whid,
      name: formValue.name,
      material: formValue.material,
      quantity: formValue.quantity,
    };
    addStorageLocation(body)
      .then((res) => {
        setFormValues({
          name: "",
          material: "",
          quantity: "",
        });
        Toast.show({
          icon: "success",
          content: "Successfully",
        });
        router.back();
      })
      .catch((e) => {
        Toast.show({
          icon: "fail",
          content: e,
        });
      });
  };
  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <div>
        <PageHeader
          title="Warehouse"
          subTitle="Warehouses for your storage solutions"
        ></PageHeader>
        <div className="p-4">
          <p className=" font-normal text-[20px]">Add a Storage Location</p>

          <div>
            <CusInput
              id="name"
              name="Name"
              value={formValue.name}
              setValue={handleSetFormValues}
            ></CusInput>
            <CusInput
              id="material"
              name="Material"
              value={formValue.material}
              setValue={handleSetFormValues}
            ></CusInput>
            <CusInput
              id="quantity"
              name="Quantity"
              value={formValue.quantity}
              setValue={handleSetFormValues}
            ></CusInput>
          </div>

          <div className="mt-6 flex flex-row justify-center gap-4 pb-8">
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button color="primary" fill="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

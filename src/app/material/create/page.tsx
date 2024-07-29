"use client";
import CusInput from "@/app/components/cus-input/cus-input";
import PageHeader from "@/app/components/page-header/page-header";
import { Button, Toast } from "antd-mobile";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addMaterial } from "@/actions/material";

export default function CreateMaterial() {
  const router = useRouter();
  const [formValue, setFormValues] = useState({
    material_code: "",
    name: "",
    material_type: "",
    min: "",
    max: "",
    unit: "",
    status: "",
  note: "",
  expect_storage_locations: ""
  });

  const handlerSetFormValues = (val: any, id: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: val,
    }));
  };

  const handleSave = () => {
    // const newValidation = {
    //   nameInvalid: !formValue.name || formValue.name === "",
    //   warehouseIdInvalid:
    //     !formValue.warehouse_id || formValue.warehouse_id === "",
    //   typeInvalid: !formValue.type || formValue.type === "",
    // };

    // console.log(formValue);
    // return;
    addMaterial(formValue)
      .then((res) => {
        setFormValues({
            material_code: "",
            name: "",
            material_type: "",
            min: "",
            max: "",
            unit: "",
            status: "",
          note: "",
          expect_storage_locations: ""
        });
        Toast.show({
          icon: "success",
          content: "Successfully",
        });
        router.push("/material");
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
          title="Material"
          subTitle="Input materials details for inventory management"
        ></PageHeader>
        <div className="p-4">
          <p className=" font-normal text-[20px]">Create A Material</p>
          <CusInput
            id="material_code"
            name="Material Code"
            value={formValue.material_code}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="name"
            name="Material Name"
            value={formValue.name}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="material_type"
            name="Material Type"
            value={formValue.material_type}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="min"
            name="Min Stock"
            value={formValue.min}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="max"
            name="Max Stock"
            value={formValue.max}
            setValue={handlerSetFormValues}
          ></CusInput>{" "}
          <CusInput
            id="unit"
            name="Unit"
            value={formValue.unit}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="status"
            name="Status"
            value={formValue.status}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="note"
            name="Note"
            value={formValue.note}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="expect_storage_locations"
            name="Expect Location"
            value={formValue.expect_storage_locations}
            setValue={handlerSetFormValues}
          ></CusInput>
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

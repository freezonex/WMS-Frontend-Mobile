"use client";
import CusInput from "@/app/components/cus-input/cus-input";
import PageHeader from "@/app/components/page-header/page-header";
import { Button, Toast } from "antd-mobile";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddWarehouses } from "@/actions/warehouse";

export default function CreateWarehouse() {
  const router = useRouter();
  const [formValue, setFormValues] = useState({
    name: "",
    warehouse_id: "",
    type: "",
    manager: "",
    department: "",
    email: "",
    project_group: "",
    note: "",
  });

  const handlerSetFormValues = (val: any, id: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: val,
    }));
  };

  const handleSave = () => {
    const newValidation = {
      nameInvalid: !formValue.name || formValue.name === "",
      warehouseIdInvalid:
        !formValue.warehouse_id || formValue.warehouse_id === "",
      typeInvalid: !formValue.type || formValue.type === "",
    };

    console.log(formValue);
    AddWarehouses(formValue)
      .then((res) => {
        setFormValues({
          name: "",
          warehouse_id: "",
          type: "",
          manager: "",
          department: "",
          email: "",
          project_group: "",
          note: "",
        });
        Toast.show({
          icon: "success",
          content: "Successfully",
        });
        router.push("/warehouse");
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
          <p className=" font-normal text-[20px]">Create a New Warehouse</p>
          <CusInput
            id="name"
            name="Name"
            value={formValue.name}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="warehouse_id"
            name="Warehouse ID"
            value={formValue.warehouse_id}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="type"
            name="Type"
            value={formValue.type}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="manager"
            name="Manager"
            value={formValue.manager}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="project_group"
            name="Project Group"
            value={formValue.project_group}
            setValue={handlerSetFormValues}
          ></CusInput>{" "}
          <CusInput
            id="department"
            name="Department"
            value={formValue.department}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="email"
            name="Email"
            value={formValue.email}
            setValue={handlerSetFormValues}
          ></CusInput>
          <CusInput
            id="note"
            name="Note"
            value={formValue.note}
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

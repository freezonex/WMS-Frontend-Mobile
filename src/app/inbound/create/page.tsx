"use client";
import CusInput from "@/app/components/cus-input/cus-input";
import PageHeader from "@/app/components/page-header/page-header";
import { Button, Toast } from "antd-mobile";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInbound() {
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
    console.log(formValue);
    // AddWarehouses(formValue)
    //   .then((res) => {
    //     setFormValues({
    //       name: "",
    //       warehouse_id: "",
    //       type: "",
    //       manager: "",
    //       department: "",
    //       email: "",
    //       project_group: "",
    //       note: "",
    //     });
    //     Toast.show({
    //       icon: "success",
    //       content: "Successfully",
    //     });
    //     router.push("/warehouse");
    //   })
    //   .catch((e) => {
    //     Toast.show({
    //       icon: "fail",
    //       content: e,
    //     });
    //   });
  };
  const handleNext=()=>{

  }
  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <div>
        <PageHeader
          title="Inbound"
          subTitle="Log new inventory arrivals quickly"
        ></PageHeader>
        <div className="p-4">
          <p className=" font-normal text-[20px]">Create a Inbound List</p>
          <div></div>
          <div>
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
            ></CusInput>
          </div>

          <div className="mt-6 flex flex-row justify-center gap-4 pb-8">
            <Button color="primary" onClick={handleNext}>
              Next
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

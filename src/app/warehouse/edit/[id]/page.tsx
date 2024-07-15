"use client";
"use client";
import CusInput from "@/app/components/cus-input/cus-input";
import PageHeader from "@/app/components/page-header/page-header";
import { Button, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWarehouses, updateWarehouse } from "@/actions/warehouse";
import { IPaginated } from "@/interface/IPaginated";

interface IParams {
  params: {
    id: string;
  };
}
export default function EditWarehouse({ params }: IParams) {
  const router = useRouter();
  const [formValue, setFormValues] = useState({
    id: "",
    name: "",
    warehouse_id: "",
    type: "",
    manager: "",
    department: "",
    email: "",
    project_group: "",
    note: "",
  });

  useEffect(() => {
    const pageObject: IPaginated = {
      pageNum: 1,
      pageSize: 1,
    };
    fetchWarehouses({ id: params.id }, pageObject)
      .then((res: any) => {
        if (res.data && res.data.list.length > 0) {
          const data = res.data.list[0] as { [key: string]: string | number };
          Object.keys(data).map((key, index) => {
            setFormValues((prevValues) => ({
              ...prevValues,
              [key]: data[key],
            }));
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params]);

  const handlerSetFormValues = (val: any, id: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: val,
    }));
  };

  const handleSave = () => {
    console.log(formValue);
    updateWarehouse(formValue)
      .then((res) => {
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
          <p className=" font-normal text-[20px]">
            Warehouse ID: {formValue.warehouse_id}
          </p>
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

"use client";
import CusInput from "@/components/cus-input/cus-input";
import PageHeader from "@/components/page-header/page-header";
import { Button, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addMaterial } from "@/actions/material";
import { Product } from "@carbon/icons-react";
import { materialTypes } from "@/utils/constant";
import { fetchWHNameMap } from "@/actions/warehouse";

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
    expect_wh_id: "",
    expect_storage_locations: "",
  });
  const [whNameMaps, setWhNameMaps] = useState<any[]>([]);

  useEffect(() => {
    fetchWHNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res: any) => {
        if (res.data) {
          setWhNameMaps(res.data.list);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch WH name map:", error);
      });
  }, []);
  const handlerSetFormValues = (val: any, id: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: val,
    }));
  };

  const handleSave = () => {
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
          expect_wh_id: "",
          expect_storage_locations: "",
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
          icon={<Product size={110} color="blue"></Product>}
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
          <div className="mt-6">
            <p className="mb-2">Material Type</p>
            <select
              value={formValue.material_type}
              onChange={(e) =>
                handlerSetFormValues(e.target.value, "material_type")
              }
            >
              <option className="placeholder" value="" disabled>
                Material Type
              </option>
              {materialTypes.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
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
          ></CusInput>
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
          <div className="mt-6">
            <p className="mb-2">Warehouse</p>
            <select
              value={formValue.expect_wh_id}
              onChange={(e) =>
                handlerSetFormValues(e.target.value, "expect_wh_id")
              }
            >
              <option className="placeholder" value="" disabled>
                Please choose
              </option>
              {whNameMaps.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <CusInput
            id="expect_storage_locations"
            name="Expect Location"
            placeholder="e.g. A-01,B-01"
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

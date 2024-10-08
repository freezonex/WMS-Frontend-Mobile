"use client";
import PageHeader from "@/components/page-header/page-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar, Toast } from "antd-mobile";
import AddAuditingOrder from "./_components/add-auditing-order";
import AddAduditingOrderDetail from "./_components/add-auditing-order-detail";
import {
  IAuditingMaterial,
  IAuditingCreateVM,
} from "@/interface/viewmode/auditing";
import { addStocktakingRecord } from "@/actions/auditing";
import {
  CheckmarkOutline,
  CircleDash,
  Incomplete,
  InventoryManagement,
} from "@carbon/icons-react";
interface IFormValue {
  id: "";
  source: "";
  type: "";
  delivery_date: Date;
  status: string;
}

export default function CreateAuditing() {
  const router = useRouter();
  const [formValue, setFormValues] = useState<IFormValue>({
    id: "",
    source: "",
    type: "",
    delivery_date: new Date(),
    status: "",
  });

  const [showNext, setShowNext] = useState(false);

  const validateFormValue = () => {
    let saveFlag = true;
    if (!formValue.type) {
      Toast.show("Type required.");
      saveFlag = false;
    }
    if (!formValue.source) {
      Toast.show("Source required.");
      saveFlag = false;
    }
    if (!formValue.delivery_date) {
      Toast.show("Delivery Date required.");
      saveFlag = false;
    }
    if (!formValue.status) {
      Toast.show("Status required.");
      saveFlag = false;
    }
    return saveFlag;
  };
  const handleSave = (datas: IAuditingCreateVM[]) => {
    let saveFlag = validateFormValue();
    if (!saveFlag) {
      return;
    }

    const promises: any[] = [];
    datas.forEach(async (t) => {
      const materials: IAuditingMaterial[] = [];
      t.materials.forEach((m) => {
        if (m.quantity) {
          materials.push(m);
        }
      });
      t.materials = materials;
      let body = {
        ...formValue,
        details: convertTaskListDatas(t.materials),
      };
      // console.log(body);
      const promis = await addStocktakingRecord(body);
      promises.push(promis);
      Promise.all(promises)
        .then(() => {
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
    });
    // console.log("save", datas, formValue);
  };
  const convertTaskListDatas = (materials: IAuditingMaterial[]) => {
    const details = materials.map((task) => {
      return {
        location_id: task.location_id,
        material_id: task.material_id,
        material_name: task.material_name,
        quantity: task.quantity,
      };
    }) as IAuditingMaterial[];
    return details;
  };

  const handleNext = () => {
    let saveFlag = validateFormValue();
    if (!saveFlag) {
      return;
    }
    setShowNext(true);
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <>
      <div>
        <PageHeader
          title="Auditing"
          subTitle="Verify and adjust inventory accuracy"
          icon={
            <InventoryManagement size={110} color="blue"></InventoryManagement>
          }
        ></PageHeader>
        <div className="p-4">
          <p className=" font-normal text-[20px]">Create a Auditing Order</p>
          <div className="mt-4 mb-6">
            <ProgressBar
              style={{
                "--track-width": "2px",
              }}
              percent={!showNext ? 50 : 100}
            />
            <div className="flex flex-row mt-4">
              <div className="flex-1 flex flex-row items-center">
                {!showNext && <Incomplete color="blue"></Incomplete>}
                {showNext && <CheckmarkOutline color="blue"></CheckmarkOutline>}
                <span className="ml-2">Default</span>
              </div>
              <div className="flex-1  flex flex-row items-center">
                {!showNext && <CircleDash color="blue"></CircleDash>}
                {showNext && <Incomplete color="blue"></Incomplete>}
                <span className="ml-2"> Material List </span>
              </div>
            </div>
          </div>
          {!showNext && (
            <AddAuditingOrder
              formValue={formValue}
              setFormValues={setFormValues}
              onNext={handleNext}
              onCancel={handleCancel}
            ></AddAuditingOrder>
          )}
          {showNext && (
            <AddAduditingOrderDetail
              onBack={() => setShowNext(false)}
              onSave={handleSave}
            ></AddAduditingOrderDetail>
          )}
        </div>
      </div>
    </>
  );
}

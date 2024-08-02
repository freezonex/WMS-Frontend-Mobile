"use client";
import PageHeader from "@/components/page-header/page-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InboundNextCard from "./_components/add-material";
import AddInboundCard from "./_components/add-inbound";
import { IMaterialDetail } from "@/interface/viewmode/inbound";
import { ProgressBar, Toast } from "antd-mobile";
import { addInboundRecord } from "@/actions/inbound";
import { CheckmarkOutline, CircleDash, Incomplete, PortInput } from "@carbon/icons-react";
interface IFormValue {
  creator: string;
  purchase_order_no: string;
  supplier: string;
  delivery_date: Date;
  status: string;
}

export default function CreateInbound() {
  const router = useRouter();
  const [formValue, setFormValues] = useState<IFormValue>({
    creator: "",
    purchase_order_no: "",
    supplier: "",
    delivery_date: new Date(),
    status: "",
  });

  const [showNext, setShowNext] = useState(false);

  const validateFormValue = () => {
    let saveFlag = true;
    if (!formValue.creator) {
      Toast.show("Creator required.");
      saveFlag = false;
    }
    if (!formValue.purchase_order_no) {
      Toast.show("Purchase Order No. required.");
      saveFlag = false;
    }
    if (!formValue.supplier) {
      Toast.show("Supplier required.");
      saveFlag = false;
    }
    if (!formValue.delivery_date) {
      Toast.show("Delivery Date required.");
      saveFlag = false;
    }
    return saveFlag;
  };
  const handleSave = (datas: IMaterialDetail[]) => {
    let saveFlag = validateFormValue();

    datas.forEach((t) => {
      if (!t.material_code) {
        Toast.show("Material Code required.");
        saveFlag = false;
      }
      if (!t.quantity) {
        Toast.show("Quantity required.");
        saveFlag = false;
      }
    });
    if (!saveFlag) {
      return;
    }
    let body = {
      ...formValue,
      source: "manual",
      details: convertTaskListDatas(datas),
    };
    addInboundRecord(body)
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
    console.log("save", datas, formValue);
  };
  const convertTaskListDatas = (materials: IMaterialDetail[]) => {
    const shelfRecords = materials.map((task) => {
      return {
        material_id: task.id,
        material_name: task.name,
        operation_id: "",
        rf_id: "",
        stock_quantity: 0,
        quantity: task.quantity,
        location_id: task.suggested_storage_location_id,
      };
    });
    return shelfRecords;
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
          title="Inbound"
          subTitle="Log new inventory arrivals quickly"
          icon={<PortInput size={110} color="blue"></PortInput>}
        ></PageHeader>
        <div className="p-4">
          <p className=" font-normal text-[20px]">Create a Inbound List</p>
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
            <AddInboundCard
              formValue={formValue}
              setFormValues={setFormValues}
              onNext={handleNext}
              onCancel={handleCancel}
            ></AddInboundCard>
          )}
          {showNext && (
            <InboundNextCard
              onBack={() => setShowNext(false)}
              onSave={handleSave}
            ></InboundNextCard>
          )}
        </div>
      </div>
    </>
  );
}

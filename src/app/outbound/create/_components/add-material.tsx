import { fetchMaterialWithFilters } from "@/actions/material";
import { fetchWHNameMap } from "@/actions/warehouse";
import CusInput from "@/app/components/cus-input/cus-input";
import CardItem from "@/app/components/wms-card/card-item";
import WmsCard from "@/app/components/wms-card/wms-card";
import { IMaterialDetail } from "@/interface/viewmode/inbound";
import { ScanAlt } from "@carbon/icons-react";
import { Button } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { useEffect, useRef, useState } from "react";
import ScanQrCode from "@/app/components/scan-qrcode/scan-qrcode";

interface IProps {
  onBack: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  onSave: (datas: IMaterialDetail[]) => void | Promise<void>;
}
export default function OutboundNextCard({ onBack, onSave }: IProps) {
  const defaultDetail: IMaterialDetail = {
    id: "",
    name: "",
    material_code: "",
    specification: "",
    quantity: "",
    unit: "",
    expect_wh_id: "",
    suggested_storage_location_id: "",
    expect_wh_text: "",
    suggested_storage_location_name: "",
  };
  const [details, setDetails] = useState<IMaterialDetail[]>([]);
  const [whNameMap, setWhNameMap] = useState<any>({});
  const [showScan, setShowScan] = useState(false);
  const [currentRow, setCurrentRow] = useState(-1);

  const refInput = useRef<HTMLElement | any>();
  useEffect(() => {
    fetchWHNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res: any) => {
        if (res.data) {
          const map = res.data.list.reduce((acc: any, curr: any) => {
            acc[curr.id] = curr.name;
            return acc;
          }, {});
          setWhNameMap(map);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch WH name map:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetFormValues = (val: any, field: string, rowId: number) => {
    setDetails((prev) =>
      prev.map((item, i) => {
        if (i == rowId) {
          return {
            ...item,
            [field]: val,
          };
        }
        return item;
      })
    );
  };
  const handleBlur = async (e: any, rowId: number) => {
    console.log(e.target.value, rowId);
    const materialData = (await fetchMaterialWithFilters({
      material_code: e.target.value,
    })) as any;
    if (
      materialData &&
      materialData.data &&
      materialData.data.list.length > 0
    ) {
      const material = materialData.data.list[0];
      setDetails((prev) =>
        prev.map((item, index) => {
          if (index == rowId) {
            return {
              id: material.id,
              material_code: material.material_code,
              name: material.name,
              specification: material.specification,
              quantity: "",
              unit: material.unit,
              expect_wh_id: material.expect_wh_id,
              suggested_storage_location_id:
                material.suggested_storage_location_id,
              expect_wh_text: whNameMap[material.expect_wh_id],
              suggested_storage_location_name:
                material.suggested_storage_location_name,
            };
          }
          return item;
        })
      );
    } else {
      setDetails((prevs) =>
        prevs.map((item, i) => {
          if (i === rowId) {
            return defaultDetail;
          }
          return item;
        })
      );
    }
  };
  const handleQuantiyBlur = (e: FocusEvent, rowId: number) => {
    const regx = /^\d+(\.\d+)?$/;
    if (!regx.test((e.target as any).value)) {
      setDetails((prev) =>
        prev.map((item, index) => {
          if (index == rowId) {
            return {
              ...item,
              quantity: "",
            };
          }
          return item;
        })
      );
    }
  };
  const handleDelete = (id: number) => {
    if (details.length > 0) {
      setDetails(details.filter((_, index) => index != id));
    }
  };
  const handleAddOutboundMaterial = () => {
    setDetails([...details, defaultDetail]);
  };

  const handleScan = (rowId: number) => {
    setCurrentRow(rowId);
    refInput.current.focus();
    setShowScan(true);
  };

  const handleScanResult = async (rowId: number, val: string) => {
    setDetails((prev) =>
      prev.map((item, i) => {
        if (i == rowId) {
          return {
            ...item,
            material_code: val,
          };
        }
        return item;
      })
    );
    setTimeout(() => {
      refInput.current.blur();
    }, 500);
  };

  return (
    <>
      <div className="mb-4">
        <div className="mt-4">
          {details.length > 0 &&
            details.map((item: any, index) => {
              return (
                <div key={index} className="mb-4">
                  <div>
                    <WmsCard
                      title={(index + 1).toString()}
                      hasDelete={true}
                      onDelete={() => handleDelete(index)}
                    >
                      <CardItem name="Material Code">
                        <DataItem>
                          <div>
                            <CusInput
                              styleWrapper={{
                                marginTop: "0px",
                                background: "#eee",
                              }}
                              id="material_code"
                              styleInput={{ background: "#eee" }}
                              value={item.material_code}
                              setValue={(val, id) =>
                                handleSetFormValues(val, id, index)
                              }
                              onBlur={(e) => handleBlur(e, index)}
                              refInput={refInput}
                            ></CusInput>
                          </div>
                          <div>
                            <ScanAlt
                              size={24}
                              onClick={() => handleScan(index)}
                            ></ScanAlt>
                          </div>
                        </DataItem>
                      </CardItem>
                      <CardItem name="Material Name">
                        <DataItem>
                          <div>{item.name}</div>
                          <div></div>
                        </DataItem>
                      </CardItem>
                      <CardItem name="Specifition" value="Default">
                        <DataItem>
                          <div> {item.specification}</div>
                          <div></div>
                        </DataItem>
                      </CardItem>
                      <CardItem name="Quantity">
                        <DataItem>
                          <div>
                            <CusInput
                              styleWrapper={{
                                marginTop: "0px",
                                background: "#eee",
                              }}
                              styleInput={{ background: "#eee" }}
                              id="quantity"
                              value={item.quantity}
                              setValue={(val, id) => {
                                handleSetFormValues(val, id, index);
                              }}
                              onBlur={(e: any) => handleQuantiyBlur(e, index)}
                            ></CusInput>
                          </div>
                          <div></div>
                        </DataItem>
                      </CardItem>
                      <CardItem name="Unit" value="">
                        <DataItem>
                          <div> {item.unit}</div>
                          <div></div>
                        </DataItem>
                      </CardItem>
                      <CardItem name="Warehouse" value="">
                        <DataItem>
                          <div> {item.expect_wh_text}</div>
                          <div></div>
                        </DataItem>
                      </CardItem>
                      <CardItem name="Location" value="">
                        <DataItem>
                          <div> {item.suggested_storage_location_name}</div>
                          <div></div>
                        </DataItem>
                      </CardItem>
                    </WmsCard>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Button className="mt-4 w-[100%] h-14" onClick={handleAddOutboundMaterial}>
        <div className="flex flex-row items-center justify-center">
          <AddCircleOutline fontSize={48} color="#ccc"></AddCircleOutline>
        </div>
      </Button>

      <div className="mt-6 flex flex-row justify-center gap-4 pb-8">
        <Button color="primary" onClick={() => onSave(details)}>
          Save
        </Button>
        <Button color="primary" fill="outline" onClick={onBack}>
          Back
        </Button>
      </div>
      <ScanQrCode
        visible={showScan}
        setVisible={setShowScan}
        rowId={currentRow}
        onResult={handleScanResult}
      ></ScanQrCode>
    </>
  );
}

const DataItem = ({ children }: any) => (
  <div className="text-right flex flex-row w-52 items-center justify-end">
    <div className="w-36 text-nowrap overflow-y-hidden text-ellipsis">
      <slot> {children[0]}</slot>
    </div>
    <div className="w-8 pl-2">
      <slot>{children[1]}</slot>
    </div>
  </div>
);

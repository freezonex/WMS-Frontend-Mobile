import { fetchMaterial } from "@/actions/material";
import { fetchWHNameMap, fetchWHSLNameMap } from "@/actions/warehouse";
import CusInput from "@/components/cus-input/cus-input";
import CardItem from "@/components/wms-card/card-item";
import WmsCard from "@/components/wms-card/wms-card";
import {
  IAuditingMaterial,
  IAuditingCreateVM,
} from "@/interface/viewmode/auditing";
import { Button, Collapse, Toast } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";

interface IProps {
  onBack: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  onSave: (datas: any[]) => void | Promise<void>;
}
export default function AddAduditingOrderDetail({ onBack, onSave }: IProps) {
  const [details, setDetails] = useState<IAuditingCreateVM[]>([]);
  const [whNameMaps, setWhNameMaps] = useState<any[]>([]);
  const [whslNameMap, setWhslNameMap] = useState<any[]>([]);
  const [storageLoactions, setStorageLoactions] = useState<any[]>([]);
  const [warehouse, setWarehouse] = useState("");
  const [storage, setStorage] = useState("");

  useEffect(() => {
    fetchWHNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res: any) => {
        if (res.data) {
          setWhNameMaps(res.data.list);
          if (res.data.list.length > 0) {
            setWarehouse(res.data.list[0].id);
          }
        }
      })
      .catch((error) => {
        console.error("Failed to fetch WH name map:", error);
      });
    fetchWHSLNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res: any) => {
        if (res.data) {
          setWhslNameMap(res.data.list);
        }
      })
      .catch((error) => {
        console.error("Error fetching warehouse data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (warehouse) {
      const sl = whslNameMap.filter((entry) => {
        return entry.id === warehouse;
      });
      if (sl.length > 0) {
        setStorageLoactions(sl[0].warehouseNamemap);
        if (sl[0].warehouseNamemap.length > 0) {
          setStorage(sl[0].warehouseNamemap[0].id);
        }
      }
    }
  }, [warehouse, whslNameMap]);

  const handleSetFormValues = (
    val: any,
    field: string,
    rowId: number,
    dataIndex: number
  ) => {
    setDetails((prev) =>
      prev.map((item, index) => {
        if (index == rowId) {
          const materials = item.materials.map((data: any, i: number) => {
            if (i == dataIndex) {
              return {
                ...data,
                [field]: val,
              };
            }
            return data;
          });
          item.materials = materials;
        }
        return item;
      })
    );
  };

  const handleQuantiyBlur = (
    e: FocusEvent,
    rowId: number,
    dataIndex: number
  ) => {
    const regx = /^\d+(\.\d+)?$/;
    if (!regx.test((e.target as any).value)) {
      setDetails((prev) =>
        prev.map((item, index) => {
          if (index == rowId) {
            (item.materials as any).map((data: any, i: number) => {
              if (i == dataIndex) {
                return {
                  ...data,
                  quantity: "",
                };
              }
              return data;
            });
          }
          return item;
        })
      );
    }
  };

  const handleAddMaterial = () => {
    if (storageLoactions.length == 0) {
      Toast.show("Please select storage.");
      return;
    }
    const storageName = storageLoactions.find((t) => t.id == storage).name;
    const expectWarehouse = whNameMaps.find((t) => t.id == warehouse).name;
    const materials: IAuditingMaterial[] = [];
    fetchMaterial(
      { pageNum: 1, pageSize: 10 },
      { suggested_storage_location_id: storage }
    )
      .then((res: any) => {
        if (res.data && res.data.list.length > 0) {
          res.data.list.forEach((item: any) => {
            materials.push({
              material_id: item.id,
              material_name: item.name,
              material_code: item.material_code,
              specification: item.specification,
              quantity: "",
              location_id: item.suggested_storage_location_id,
              unit: item.unit,
            });
          });
        }
        setDetails([
          ...details,
          {
            whName: expectWarehouse,
            storageName: storageName,
            storage_location_id: storage,
            materials: materials,
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="mb-4">
        <div className="mt-4">
          <div className="mt-6">
            <p className="mb-2">Warehouse</p>
            <select
              value={warehouse}
              onChange={(e: any) => {
                setWarehouse(e.target.value);
              }}
            >
              {whNameMaps &&
                whNameMaps.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-6">
            <p className="mb-2">Stoking Loaction</p>
            <select
              value={storage}
              onChange={(e) => {
                setStorage(e.target.value);
              }}
            >
              {storageLoactions.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 mb-4 ">
            <Button className="w-[100%] h-14" onClick={handleAddMaterial}>
              <div className="flex flex-row items-center justify-center">
                <AddCircleOutline fontSize={48} color="#ccc"></AddCircleOutline>
              </div>
            </Button>
          </div>
          <Collapse defaultActiveKey={["1"]}>
            {details.length > 0 &&
              details.map((data: any, index) => {
                return (
                  <Collapse.Panel
                    key={`${index}`}
                    title={`${data.whName} - ${data.storageName}`}
                  >
                    {data.materials.map((item: any, i: number) => {
                      return (
                        <div
                          className="mb-4"
                          style={{ color: "var(--foreground-color)" }}
                          key={i}
                        >
                          <WmsCard title={item.material_name}>
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
                                    type="number"
                                    styleWrapper={{
                                      marginTop: "0px",
                                      background: "#eee",
                                    }}
                                    styleInput={{ background: "#eee" }}
                                    id="quantity"
                                    value={item.quantity}
                                    setValue={(val, id) => {
                                      handleSetFormValues(val, id, index, i);
                                    }}
                                    onBlur={(e: any) =>
                                      handleQuantiyBlur(e, index, i)
                                    }
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
                          </WmsCard>
                        </div>
                      );
                    })}
                  </Collapse.Panel>
                );
              })}
          </Collapse>
        </div>
      </div>

      <div className="mt-6 flex flex-row justify-center gap-4 pb-8">
        <Button color="primary" onClick={() => onSave(details)}>
          Save
        </Button>
        <Button color="primary" fill="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </>
  );
}

const DataItem = ({ children }: any) => (
  <div className="text-right flex flex-row w-52 items-center justify-end">
    <div className="w-36 text-nowrap overflow-y-hidden text-ellipsis">
      <slot> {children}</slot>
    </div>
  </div>
);

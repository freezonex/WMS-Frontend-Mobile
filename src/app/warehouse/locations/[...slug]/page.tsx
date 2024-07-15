"use client";

import PageHeader from "@/app/components/page-header/page-header";
import { Button, Dialog, Toast } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IPaginated } from "@/interface/IPaginated";
import { Add } from "@carbon/icons-react";
import CardItem from "@/app/components/wms-card/card-item";
import WmsCard from "@/app/components/wms-card/wms-card";

import {
  deleteStorageLocation,
  fetchStorageLocationsByWId,
} from "@/actions/storage";

interface IParams {
  params: {
    id: string;
    warehosue_id: string;
    warehouse_name: string;
  };
}
export default function WarehouseLocations({ params }: IParams) {
  const router = useRouter();
  const props = JSON.parse(decodeURIComponent(JSON.stringify(params)));

  const [datas, setDatas] = useState<any[]>([]);

  useEffect(() => {
    const id = props.slug[0];
    const pageObject: IPaginated = {
      pageNum: 1,
      pageSize: 10,
    };
    fetchStorageLocationsByWId({ warehouse_id: id }, pageObject).then(
      (res: any) => {
        if (res.data) {
          setDatas(res.data.list);
        }
        console.log(res);
      }
    );
  }, []);

  const handleDelete = (id: string) => {
    Dialog.confirm({
      content: "Are you sure to delete?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: async () => {
        delLocation(id);
      },
    });
  };
  const delLocation = (id: string) => {
    deleteStorageLocation({ id: id })
      .then((res: any) => {
        Toast.show({
          icon: "success",
          content: "Successfully",
        });
        //load data;
      })
      .catch((e) => {
        Toast.show({
          icon: "fail",
          content: e,
        });
      });
  };
  const handleAddLocation = () => {
    router.push(`/warehouse/locations/add-location/${props.slug[0]}`);
  };
  return (
    <>
      <div>
        <PageHeader
          title="Warehouse"
          subTitle="Warehouses for your storage solutions"
        ></PageHeader>
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <div>
              <p className=" font-normal text-[20px]">All Storage Location</p>
              <p>
                All Storage location under:
                <span className="ml-2">
                  {`${props.slug[1]} - ${props.slug[2]}`}.
                </span>
              </p>
            </div>
            <div>
              <Button color="primary" size="small" onClick={handleAddLocation}>
                <Add size={24} color="white"></Add>
              </Button>
            </div>
          </div>
        </div>
        <div className="ml-4 mr-4">
          <div className="mb-4">
            {datas.length > 0 &&
              datas.map((item: any, index) => {
                return (
                  <div key={index} className="mb-4">
                    <WmsCard
                      key={index}
                      title={item.name}
                      hasDelete={true}
                      onDelete={() => handleDelete(item.id)}
                    >
                      <CardItem
                        name="Storage Location"
                        value={item.name}
                      ></CardItem>
                      <CardItem
                        name="Occupied"
                        value={item.supplier}
                      ></CardItem>
                      <CardItem
                        name="Material"
                        value={item.material_name}
                      ></CardItem>
                      <CardItem
                        name="Quantity"
                        value={item.quantity}
                      ></CardItem>
                    </WmsCard>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

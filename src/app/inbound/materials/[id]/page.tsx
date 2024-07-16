"use client";
import { fetchInbound } from "@/actions/inbound";
import PageHeader from "@/app/components/page-header/page-header";
import { IPaginated } from "@/interface/IPaginated";
import { List } from "antd-mobile";
import { useEffect, useState } from "react";

interface IParams {
  params: {
    id: string;
  };
}
export default function InboundMaterials({ params }: IParams) {
  const [datas, setDatas] = useState<any[]>([]);
  useEffect(() => {
    const pageParams: IPaginated = {
      pageNum: 1,
      pageSize: 1,
    };
    fetchInbound({ id: params.id }, pageParams)
      .then((res: any) => {
        if (res.data && res.data.list.length > 0) {
          setDatas(res.data.list[0].details);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params]);
  return (
    <>
      <div>
        <PageHeader
          title="Inbound"
          subTitle="Log new inventory arrivals quickly"
        ></PageHeader>
        <div className="p-4">
          <p className=" font-normal text-[20px]">All Material</p>
          <p>
            The following meterils entered the designated warehouse in this
            task.
          </p>
        </div>
        <div className="p-4">
          <div
            className="flex flex-row  font-semibold pl-4 pr-4 
            h-8 items-center bg-[#C6C6C6]"
          >
            <div className="w-[50%]">Name</div>
            <div>Quantity</div>
          </div>
          <List className="list">
            {datas &&
              datas.map((item, index) => {
                return (
                  <List.Item key={index}>
                    <div className="flex flex-row h-8 items-center ">
                      <div className="w-[50%]">{item.material_name}</div>
                      <div className="w-[50%]">{item.quantity}</div>
                    </div>
                  </List.Item>
                );
              })}
          </List>
        </div>
      </div>
    </>
  );
}

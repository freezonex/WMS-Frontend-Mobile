"use client";
import { fetchStocktaking } from "@/actions/auditing";
import PageHeader from "@/components/page-header/page-header";
import { IPaginated } from "@/interface/IPaginated";
import { InventoryManagement } from "@carbon/icons-react";
import { List, Tag } from "antd-mobile";
import { useEffect, useState } from "react";

export default function AuditingDetail({ id }: any) {
  const [datas, setDatas] = useState<any[]>([]);
  useEffect(() => {
    const pageParams: IPaginated = {
      pageNum: 1,
      pageSize: 1,
    };
    fetchStocktaking({ id: id }, pageParams)
      .then((res: any) => {
        if (res.data && res.data.list.length > 0) {
          setDatas(res.data.list[0].details);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const getColor = (value: number) => {
    if (value == 0) {
      return "#D0E2FF";
    }
    if (value > 0) {
      return "#A7F0BA";
    }
    if (value < 0) {
      return "#FFD7D9";
    }
  };
  return (
    <>
      <div>
        <PageHeader
          title="Auditing"
          subTitle="Verify and adjust inventory accuracy"
          icon={<InventoryManagement size={110} color="blue"></InventoryManagement>}
        ></PageHeader>
        <div className="p-4">
          <p className=" font-normal text-[20px]">Result</p>
          <p>
            The following products entered the designated warehouse in this
            inbound task.
          </p>
        </div>
        <div className="p-4">
          <div
            className="flex flex-row  font-semibold pl-4 pr-4
            h-8 items-center bg-[#C6C6C6]"
          >
            <div className="w-[40%]">Name</div>
            <div className="w-[20%]">QTY</div>
            <div className="w-[25%]">Stock QTY</div>
            <div>Discrepancy</div>
          </div>
          <List className="list">
            {datas &&
              datas.map((item, index) => {
                return (
                  <List.Item key={index}>
                    <div className="flex flex-row h-8 items-center ">
                      <div className="w-[40%] text-ellipsis overflow-hidden text-nowrap">
                        {item.material_name}
                      </div>
                      <div className="w-[20%]">{item.quantity}</div>
                      <div className="w-[25%]">{item.stock_quantity}</div>
                      <div>
                        <Tag
                          color={getColor(item.stock_quantity - item.quantity)}
                          style={{ "--text-color": "#000", minWidth: "25px" }}
                          className="text-center"
                          round
                        >
                          {item.stock_quantity - item.quantity}
                        </Tag>
                      </div>
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

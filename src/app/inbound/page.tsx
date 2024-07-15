"use client";
import React, { useEffect, useState } from "react";
import { SearchBar, PullToRefresh, InfiniteScroll } from "antd-mobile";
import PageHeader from "../components/page-header/page-header";
import { IPaginated } from "@/interface/IPaginated";
import { DateTimeFormat, PageSize } from "@/utils/constant";
import WmsCard from "../components/wms-card/wms-card";
import CardItem from "../components/wms-card/card-item";
import { fetchInbound } from "@/actions/inbound";
import moment from "moment";

export default function Inbound() {
  const [datas, setDatas] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const loadData = async () => {
    const pageParams: IPaginated = {
      pageNum: pageNum,
      pageSize: PageSize,
    };
    if (pageNum == 1) {
      setDatas([]);
      setHasMore(true);
    }
    try {
      const res = (await fetchInbound(pageParams)) as any;
      if (res.data) {
        if (!res.data.hasNextPage) {
          setHasMore(false);
        } else {
          setPageNum(pageNum + 1);
        }
        if (pageNum <= 1) {
          setDatas(res.data.list);
        } else {
          setDatas((prev) => [...prev, ...res.data.list]);
        }
      } else {
        setDatas([]);
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleLoadMore = async () => {
    return await loadData();
  };
  const handleCardOperation = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          setPageNum(1);
          loadData();
        }}
      >
        <PageHeader
          title="Inbound"
          subTitle="Log new inventory arrivals quickly"
        ></PageHeader>

        <div className="p-4">
          <div className="flex flex-row justify-between">
            <select className="w-[50%] ml-2" onChange={() => {}}>
              {/* <option value="Manager" disabled selected style={{ display: "none" }}>
            Manager
          </option> */}
              <option value="test1">Material Type</option>
              <option value="test2">test2</option>
            </select>
          </div>
          <SearchBar
            className="mt-4"
            placeholder="|"
            style={{
              "--border-radius": "100px",
              "--background": "#ffffff",
              "--height": "32px",
              "--padding-left": "12px",
            }}
          />
        </div>
        <div className="ml-4 mr-4">
          <div className="mb-4">
            {datas.length > 0 &&
              datas.map((item: any, index) => {
                return (
                  <div key={index} className="mb-4">
                    <WmsCard
                      key={index}
                      title={"Inbound ID:" + item.id}
                      callback={() => {}}
                    >
                      <CardItem
                        name="Purchase Order No."
                        value={item.purchase_order_no}
                      ></CardItem>
                      <CardItem
                        name="Supplier"
                        value={item.supplier}
                      ></CardItem>
                      <CardItem
                        name="Inbounder"
                        value={item.operator}
                      ></CardItem>
                      <CardItem name="Material">
                        <a href={`/inbound/materials/${item.id}`}>
                          All Material
                        </a>
                      </CardItem>
                      <CardItem
                        name="Delivery Date"
                        value={moment(item.delivery_date).format(
                          DateTimeFormat.ShortDateTime
                        )}
                      ></CardItem>
                      <CardItem
                        name="Create Time"
                        value={moment(item.create_time).format(
                          DateTimeFormat.ShortDateTime
                        )}
                      ></CardItem>
                      <CardItem name="Status" value={item.status}></CardItem>
                      <CardItem name="Notes" value={item.note}></CardItem>
                    </WmsCard>
                  </div>
                );
              })}
          </div>
        </div>
        <InfiniteScroll
          loadMore={handleLoadMore}
          hasMore={hasMore}
          threshold={100}
        />
      </PullToRefresh>
    </>
  );
}

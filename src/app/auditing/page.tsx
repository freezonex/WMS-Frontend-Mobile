"use client";
import React, { useEffect, useRef, useState } from "react";
import { InfiniteScroll, PullToRefresh, SearchBar } from "antd-mobile";
import PageHeader from "../components/page-header/page-header";
import IconButton from "../components/icon-button/icon-button";
import { IPaginated } from "@/interface/IPaginated";
import { DateTimeFormat, PageSize } from "@/utils/constant";
import CardItem from "../components/wms-card/card-item";
import WmsCard from "../components/wms-card/wms-card";
import moment from "moment";
import { fetchStocktaking } from "@/actions/auditing";

export default function Auditing() {
  const [datas, setDatas] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const pageNum = useRef(1);

  const loadData = async () => {
    const pageParams: IPaginated = {
      pageNum: pageNum.current,
      pageSize: PageSize,
    };
    if (pageNum.current == 1) {
      setDatas([]);
      setHasMore(true);
    }
    try {
      const res = (await fetchStocktaking({}, pageParams)) as any;
      if (res.data) {
        if (!res.data.hasNextPage) {
          setHasMore(false);
        }
        if (pageNum.current <= 1) {
          setDatas(res.data.list);
        } else {
          console.log(res.data.list);
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
    await loadData();
    pageNum.current += 1;
  };
  const handleCardOperation = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          pageNum.current = 1;
          loadData();
        }}
      >
        <PageHeader
          title="Auditing"
          subTitle="Verify and adjust inventory accuracy"
        >
          <IconButton text="Create Auditing Order"></IconButton>
        </PageHeader>
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
            placeholder="Material Code | Material Name"
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
                      title={`Operation : ${item.id}`}
                    >
                      <CardItem name="Type" value={item.type}></CardItem>
                      <CardItem
                        name="Operator"
                        value={item.operator}
                      ></CardItem>
                      <CardItem name="Source" value={item.source}></CardItem>
                      <CardItem name="Result">
                        <a href={`/auditing/detial/${item.id}`}>View Detail</a>
                      </CardItem>
                      <CardItem
                        name="Delivery date"
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

"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Space,
  Input,
  SearchBar,
  InfiniteScroll,
  PullToRefresh,
  Dialog,
  Toast,
} from "antd-mobile";
import PageHeader from "../components/page-header/page-header";
import IconButton from "../components/icon-button/icon-button";
import { IPaginated } from "@/interface/IPaginated";
import { DateTimeFormat, PageSize } from "@/utils/constant";
import CardItem from "../components/wms-card/card-item";
import WmsCard from "../components/wms-card/wms-card";
import {
  deleteOutbound,
  fetchOutbound,
  updateOutboundRecord,
} from "@/actions/outbound";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Outbound() {
  const router = useRouter();
  const [datas, setDatas] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const handleCreate = () => {
    router.push("outbound/create");
  };
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
      const res = (await fetchOutbound({}, pageParams)) as any;
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
  const handleDelete = (id: string) => {
    Dialog.confirm({
      content: "Are you sure to delete?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: async () => {
        delOutbound(id);
      },
    });
  };
  const delOutbound = (id: string) => {
    deleteOutbound({ id: id })
      .then((res: any) => {
        Toast.show({
          icon: "success",
          content: "Successfully",
        });
        loadData();
      })
      .catch((e) => {
        Toast.show({
          icon: "fail",
          content: e,
        });
      });
  };
  const handleOutbound = (id: string) => {
    const data = {
      source: "manual",
      status: "done",
      id,
    };
    updateOutboundRecord(data)
      .then(() => {
        Toast.show({
          icon: "success",
          content: "Successfully",
        });
        loadData();
      })
      .catch((e) => {
        Toast.show({
          icon: "fail",
          content: e,
        });
      });
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
          title="Outbound"
          subTitle="Process and track inventory dispatches"
        >
          <IconButton
            text="Create a Outbound List"
            onClick={handleCreate}
          ></IconButton>
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
                      title={"Oubound ID :" + item.id}
                      hasDelete={true}
                      onDelete={() => handleDelete(item.id)}
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
                        name="Outbounder"
                        value={item.operator}
                      ></CardItem>
                      <CardItem name="Material">
                        <Link href={`/outbound/materials/${item.id}`}>
                          All Material
                        </Link>
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
                      <CardItem name="Operation">
                        <Button
                          size="mini"
                          style={{ background: "#ddd" }}
                          onClick={() => handleOutbound(item.id)}
                        >
                          Outbound
                        </Button>
                      </CardItem>
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

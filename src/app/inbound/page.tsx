"use client";
import React, { useState } from "react";
import {
  PullToRefresh,
  InfiniteScroll,
  Dialog,
  Toast,
  Button,
} from "antd-mobile";
import PageHeader from "../components/page-header/page-header";
import { IPaginated } from "@/interface/IPaginated";
import { DateTimeFormat, operationStatuses, PageSize } from "@/utils/constant";
import WmsCard from "../components/wms-card/wms-card";
import CardItem from "../components/wms-card/card-item";
import {
  deleteInbound,
  fetchInbound,
  updateInboundRecord,
} from "@/actions/inbound";
import moment from "moment";
import IconButton from "../components/icon-button/icon-button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CusDatePicker from "../components/cus-date-picker/cus-date-picker";
import CusSearchBar from "../components/search-bar/cus-searchbar";
import { cusDlg } from "@/utils/common";

export default function Inbound() {
  const router = useRouter();
  const [datas, setDatas] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [query, setQuery] = useState({
    status: "",
    delivery_date: "",
    keyword: "",
  });

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
      const res = (await fetchInbound(
        {
          status: query.status,
          delivery_date: query.delivery_date,
          purchase_order_no: query.keyword,
        },
        pageParams
      )) as any;
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

  const handleCreate = () => {
    router.push("/inbound/create");
  };

  const handleDelete = (id: string) => {
    cusDlg.confirm("Are you sure to delete?", () => {
      delInbound(id);
    });
  };

  const delInbound = (id: string) => {
    deleteInbound({ id: id })
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
  const handleInbound = (id: string) => {
    cusDlg.confirm("Are you sure to Inbound?", () => {
      const data = {
        source: "manual",
        status: "done",
        id,
      };
      updateInboundRecord(data)
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
    });
  };

  const handleQueryData = (field: string, val: string) => {
    setQuery((prev) => ({
      ...prev,
      [field]: val,
    }));
  };
  const handleSearch = () => {
    loadData();
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
        >
          <IconButton
            text="Create Inbound List"
            onClick={handleCreate}
          ></IconButton>
        </PageHeader>

        <div className="p-4">
          <div className="flex flex-row justify-between gap-2">
            <div>
              <select
                value={query.status}
                onChange={(e) => handleQueryData("status", e.target.value)}
              >
                {operationStatuses.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <CusDatePicker
                id="delivery_date"
                wrapperStyle={{ marginTop: 0 }}
                value={query.delivery_date}
                setValue={(val, id) => handleQueryData(id, val)}
              ></CusDatePicker>
            </div>
          </div>
          <CusSearchBar
            value={query.keyword}
            placeholder="Purchase Order"
            onChange={(val) => handleQueryData("keyword", val)}
            onSearch={(val) => handleQueryData("keyword", val)}
            onBtnClick={handleSearch}
          ></CusSearchBar>
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
                        name="Inbounder"
                        value={item.operator}
                      ></CardItem>
                      <CardItem name="Material">
                        <Link href={`/inbound/materials/${item.id}`}>
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
                          onClick={() => handleInbound(item.id)}
                        >
                          Inbound
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

"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Space,
  Input,
  Popup,
  SearchBar,
  Card,
  InfiniteScroll,
  PullToRefresh,
  Modal,
  Toast,
  Dialog,
} from "antd-mobile";

import WmsCard from "../components/wms-card/wms-card";
import { deleteWarehouse, fetchWarehouses } from "@/actions/warehouse";
import CardItem from "../components/wms-card/card-item";
import PageHeader from "../components/page-header/page-header";
import IconButton from "../components/icon-button/icon-button";
import { PageSize } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { IPaginated } from "@/interface/IPaginated";

export default function Warehouse() {
  const router = useRouter();
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
      const res = (await fetchWarehouses({}, pageParams)) as any;
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
  const handleEdit = (id: string) => {
    router.push(`/warehouse/edit/${id}`);
  };
  const handleDelete = (id: string) => {
    Dialog.confirm({
      content: "Are you sure to delete?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: async () => {
        delWarhouse(id);
      },
    });
  };
  const delWarhouse = (id: string) => {
    deleteWarehouse(id)
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
  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          setPageNum(1);
          loadData();
        }}
      >
        <PageHeader
          title="Warehouse"
          subTitle="List of warehouses for your storage solutions"
        >
          <IconButton
            text="Create Warehouse"
            onClick={() => {
              router.push("/warehouse/create");
            }}
          ></IconButton>
        </PageHeader>
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <select className="w-[50%]" onChange={() => {}}>
              {/* <option value="Type" disabled selected style={{ display: "none" }}>
            Type
          </option> */}
              <option value="test1">test1</option>
              <option value="test2">test2</option>
            </select>
            <select className="w-[50%] ml-2" onChange={() => {}}>
              {/* <option value="Manager" disabled selected style={{ display: "none" }}>
            Manager
          </option> */}
              <option value="test1">test1</option>
              <option value="test2">test2</option>
            </select>
          </div>
          <SearchBar
            className="mt-4"
            placeholder="Warehouse ID|Name"
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
                      title={"Warehouse ID: " + item.warehouse_id}
                      hasEdit={true}
                      hasDelete={true}
                      onEdit={() => handleEdit(item.id)}
                      onDelete={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <CardItem name="Name" value={item.name}></CardItem>
                      <CardItem name="Type" value={item.type}></CardItem>
                      <CardItem name="Manager" value={item.manager}></CardItem>
                      <CardItem
                        name="Project Group"
                        value={item.project_group}
                      ></CardItem>
                      <CardItem
                        name="Department"
                        value={item.department}
                      ></CardItem>
                      <CardItem name="Email" value={item.email}></CardItem>
                      <CardItem name="Storage Location">
                        <div>
                          <a href={`/warehouse/locations/${item.id}/${item.warehouse_id}/${item.name}`}>
                            All Location
                          </a>
                        </div>
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

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
import { PageSize, warehouseTypes } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { IPaginated } from "@/interface/IPaginated";
import Link from "next/link";
import { cusDlg } from "@/utils/common";
import CusInput from "../components/cus-input/cus-input";
import CusSearchBar from "../components/search-bar/cus-searchbar";

export default function Warehouse() {
  const router = useRouter();
  const [datas, setDatas] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [query, setQuery] = useState({
    type: "",
    manager: "",
    keyword: "",
  });

  const loadData = async () => {
    console.log("loadrefesh", isRefresh);
    const pageParams: IPaginated = {
      pageNum: pageNum,
      pageSize: PageSize,
    };
    if (pageNum == 1) {
      setDatas([]);
      setHasMore(true);
    }
    try {
      const res = (await fetchWarehouses(
        {
          name: query.keyword,
          manager: query.manager,
          type: query.type,
        },
        pageParams
      )) as any;
      if (res.data) {
        if (!res.data.hasNextPage) {
          setHasMore(false);
        } else {
          if (!isRefresh) {
            setPageNum(pageNum + 1);
          }
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
      if (isRefresh) {
        setIsRefresh(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleLoadMore = async () => {
    console.log("loadmore");
    return await loadData();
  };
  const handleEdit = (id: string) => {
    router.push(`/warehouse/edit/${id}`);
  };
  const handleDelete = (id: string) => {
    cusDlg.confirm("Are you sure to delete?", () => {
      delWarhouse(id);
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
          setIsRefresh(true);
          setPageNum(1);
          await loadData();
          console.log("pull");
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
          <div className="flex flex-row gap-2">
            <div className="flex-1">
              <select
                value={query.type}
                onChange={(e) => handleQueryData("type", e.target.value)}
              >
                {warehouseTypes.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <CusInput
                styleWrapper={{ marginTop: 0 }}
                id="manager"
                placeholder="Manager"
                setValue={(val, id) => handleQueryData(id, val)}
                value={query.manager}
              ></CusInput>
            </div>
          </div>
          <CusSearchBar
            value={query.keyword}
            placeholder="Warehouse Name"
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
                          <Link
                            href={`/warehouse/locations/${item.id}/${item.warehouse_id}/${item.name}`}
                          >
                            All Location
                          </Link>
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

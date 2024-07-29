"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchBar, PullToRefresh, InfiniteScroll,  Dialog,Toast } from "antd-mobile";

import WmsCard from "../../components/wms-card/wms-card";
import { fetchMaterial,deleteMaterial } from "@/actions/material";
import { IPaginated } from "@/interface/IPaginated";
import CardItem from "../../components/wms-card/card-item";
import PageHeader from "../../components/page-header/page-header";
import IconButton from "../../components/icon-button/icon-button";
import { PageSize } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { Product } from "@carbon/icons-react";


export default function Material() {
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
      const res = (await fetchMaterial({}, pageParams)) as any;
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
    router.push(`/material/edit/${id}`);
  };
  const handleDelete = (id: string) => {
    Dialog.confirm({
      content: "Are you sure to delete?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: async () => {
        delMaterial(id);
      },
    });
  };
  const delMaterial = (id: string) => {
    deleteMaterial(id)
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
          setDatas([]);
          pageNum.current = 1;
          await handleLoadMore();
        }}
      >
        <PageHeader
          title="Material"
          subTitle="Input materials details for inventory management"
          icon={<Product size={110} color="blue"></Product>}
        >
          <IconButton text="Create Material" onClick={() => {
              router.push("/material/create");
            }}></IconButton>
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
                      title={"Material ID: " + item.id}
                      hasEdit={true}
                      hasDelete={true}
                      onEdit={() => handleEdit(item.id)}
                      onDelete={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <CardItem
                        name="Material Name"
                        value={item.name}
                      ></CardItem>
                      <CardItem
                        name="Material Type"
                        value={item.material_type}
                      ></CardItem>
                      <CardItem name="Min Stock" value={item.min}></CardItem>
                      <CardItem name="Max Stock" value={item.max}></CardItem>
                      <CardItem name="Unit" value={item.unit}></CardItem>
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

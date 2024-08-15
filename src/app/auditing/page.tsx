"use client";
import React, { useEffect, useRef, useState } from "react";
import { InfiniteScroll, Input, PullToRefresh, Toast } from "antd-mobile";
import PageHeader from "../../components/page-header/page-header";
import IconButton from "../../components/icon-button/icon-button";
import { IPaginated } from "@/interface/IPaginated";
import {
  DateTimeFormat,
  operationStatuses,
  PageSize,
  stokingTypes,
} from "@/utils/constant";
import CardItem from "../../components/wms-card/card-item";
import WmsCard from "../../components/wms-card/wms-card";
import moment from "moment";
import { deleteStocktaking, fetchStocktaking } from "@/actions/auditing";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CusSearchBar from "../../components/search-bar/cus-searchbar";
import { cusDlg } from "@/utils/common";
import { InventoryManagement } from "@carbon/icons-react";

export default function Auditing() {
  const router = useRouter();
  const [pageNum, setPageNum] = useState(1);
  const [datas, setDatas] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [query, setQuery] = useState({
    type: "",
    status: "",
    keyword: "",
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (isRefresh) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]);
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
      const res = (await fetchStocktaking(
        {
          type: query.type,
          status: query.status,
          source: query.keyword,
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
          // console.log(res.data.list);
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
      if (isRefresh) {
        setIsRefresh(false);
      }
      console.log(e);
    }
  };

  const handleLoadMore = async () => {
    return await loadData();
  };

  const handleDelete = (id: string) => {
    cusDlg.confirm("Are you sure to delete?", () => {
      auditingDelete(id);
    });
  };
  const auditingDelete = (id: string) => {
    deleteStocktaking({ id: id })
      .then((res: any) => {
        Toast.show({
          icon: "success",
          content: "Successfully",
        });
        handleRefresh();
      })
      .catch((e) => {
        Toast.show({
          icon: "fail",
          content: e,
        });
      });
  };
  const handleCreateAuditing = () => {
    router.push("/auditing/create");
  };
  const handleQueryData = (field: string, val: string) => {
    setQuery((prev) => ({
      ...prev,
      [field]: val,
    }));
  };
  const handleSearch = () => {
    handleRefresh();
  };
  const handleRefresh = async () => {
    setPageNum(1);
    setIsRefresh(true);
  };
  return (
    <>
      <PullToRefresh onRefresh={async () => handleRefresh()}>
        <PageHeader
          title="Auditing"
          subTitle="Verify and adjust inventory accuracy"
          icon={
            <InventoryManagement size={110} color="blue"></InventoryManagement>
          }
        >
          <IconButton
            text="Create Auditing Order"
            onClick={handleCreateAuditing}
          ></IconButton>
        </PageHeader>
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <div className="flex-1 relative">
              <select
                value={query.type}
                onChange={(e) => handleQueryData("type", e.target.value)}
              >
                <option className="placeholder" value="" disabled>
                  Type
                </option>
                {stokingTypes.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={query.status}
                onChange={(e) => handleQueryData("status", e.target.value)}
              >
                <option className="placeholder" value="" disabled>
                  Status
                </option>
                {operationStatuses.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <CusSearchBar
            value={query.keyword}
            placeholder="Source"
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
                      title={`Operation : ${item.id}`}
                      hasDelete={true}
                      onDelete={() => handleDelete(item.id)}
                    >
                      <CardItem name="Type" value={item.type}></CardItem>
                      <CardItem
                        name="Operator"
                        value={item.operator}
                      ></CardItem>
                      <CardItem name="Source" value={item.source}></CardItem>
                      <CardItem name="Result">
                        <Link href={`/auditing/detial/${item.id}`}>
                          View Detail
                        </Link>
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

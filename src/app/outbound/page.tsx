"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  InfiniteScroll,
  PullToRefresh,
  Toast,
} from "antd-mobile";
import PageHeader from "../../components/page-header/page-header";
import IconButton from "../../components/icon-button/icon-button";
import { IPaginated } from "@/interface/IPaginated";
import { DateTimeFormat, operationStatuses, PageSize } from "@/utils/constant";
import CardItem from "../../components/wms-card/card-item";
import WmsCard from "../../components/wms-card/wms-card";
import {
  deleteOutbound,
  fetchOutbound,
  updateOutboundRecord,
} from "@/actions/outbound";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CusDatePicker from "../../components/cus-date-picker/cus-date-picker";
import CusSearchBar from "../../components/search-bar/cus-searchbar";
import { cusDlg } from "@/utils/common";
import { PortOutput } from "@carbon/icons-react";

export default function Outbound() {
  const router = useRouter();
  const [datas, setDatas] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);

  const [query, setQuery] = useState({
    status: "",
    delivery_date: "",
    keyword: "",
  });

  useEffect(() => {
    if(isRefresh){
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]);

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
      const res = (await fetchOutbound(
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
      delOutbound(id);
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
    cusDlg.confirm("Are you sure to outbound?", () => {
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
    });
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
          title="Outbound"
          subTitle="Process and track inventory dispatches"
          icon={<PortOutput size={110} color="blue"></PortOutput>}
        >
          <IconButton
            text="Create a Outbound List"
            onClick={handleCreate}
          ></IconButton>
        </PageHeader>

        <div className="p-4">
          <div className="flex flex-row justify-between gap-2">
            <div className="flex-1">
              <select
                value={query.status}
                onChange={(e) => handleQueryData("status", e.target.value)}
              >
                 <option className="placeholder" value="" selected disabled>
                  Status
                </option>
                {operationStatuses.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <CusDatePicker
                id="delivery_date"
                placeholder="Delivery Date"
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

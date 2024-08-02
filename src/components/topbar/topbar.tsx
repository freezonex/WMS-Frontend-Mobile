"use client";
import { Divider, List, Popup } from "antd-mobile";
import {
  TextAlignJustify,
  Search,
  IbmDb2Warehouse,
  Product,
  InventoryManagement,
  PortInput,
  PortOutput,
  AiLaunch,
  User,
} from "@carbon/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {} from "@carbon/icons-react";

export default function TopBar() {
  const router = useRouter();
  const pathName = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("router", pathName);
  }, [pathName]);

  const menuList: IMenu[] = [
    {
      name: "warehouse",
      title: "Warehouse",
      icon: <IbmDb2Warehouse />,
      path: "/",
    },
    {
      name: "material",
      title: "Material",
      icon: <Product />,
      path: "/material",
      bottomDivider: true,
    },
    {
      name: "inbound",
      title: "Inbound",
      icon: <PortInput />,
      path: "/inbound",
    },
    {
      name: "outbound",
      title: "Outbound",
      icon: <PortOutput />,
      path: "/outbound",
    },
    {
      name: "auditing",
      title: "Auditing",
      icon: <InventoryManagement />,
      path: "/auditing",
      bottomDivider: true,
    },
    {
      name: "ai",
      title: "AI Assistant",
      icon: <AiLaunch />,
      path: "/ai",
      bottomDivider: true,
    }
  ];

  const handleRouter = (path: string) => {
    router.replace(`${path}`);
    setVisible(false);
  };
  const handleMenuClick = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="topbar">
        <div style={{ flex: "1" }}>
          <TextAlignJustify size={24} onClick={handleMenuClick} />
        </div>
        <div className="title" style={{ flex: "8" }}>
          <span className="font-nornal">SUPCON</span>
          <span className="ml-2 font-semibold">SCM</span>
        </div>
        <div style={{ flex: "2" }}>
          <Search size={24} />
        </div>
        <div style={{ flex: "1" }}>
          <User size={24} />
        </div>
      </div>
      <Popup
        className="m"
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        position="left"
        bodyStyle={{ width: "45vw", marginTop: "48px" }}
      >
        <div className="menu-list">
          <List
            style={{
              "--border-inner": "none",
              "--border-bottom": "none",
              "--font-size": "14px",
            }}
          >
            {menuList.map((item, index) => {
              return (
                <div key={index}>
                  <List.Item
                    className="h-8"
                    prefix={item.icon}
                    onClick={() => handleRouter(item.path)}
                  >
                    {item.title}
                  </List.Item>
                  {item.bottomDivider && <Divider style={{ margin: "8px" }} />}
                </div>
              );
            })}
          </List>
        </div>
      </Popup>
    </>
  );
}

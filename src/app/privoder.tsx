"use client";
import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
export default function Privoder({ children }: any) {
  return (
    <>
      <ConfigProvider locale={enUS}>{children}</ConfigProvider>
    </>
  );
}

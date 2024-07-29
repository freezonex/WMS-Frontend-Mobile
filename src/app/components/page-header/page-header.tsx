import { ReactNode } from "react";

interface IPageHeader {
  title: string;
  subTitle: string;
  children?: ReactNode;
}
export default function PageHeader({ title, subTitle, children }: IPageHeader) {
  return (
    <>
      <div
        className="p-4"
        style={{
          background: "var(--background-content)",
          color: "var(--foreground-color)",
        }}
      >
        <div>
          <p className=" font-[400]  text-[30px]">{title}</p>
          <p className="text-[14px]">{subTitle}</p>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
}

import { ReactNode } from "react";

interface IPageHeader {
  title: string;
  subTitle: string;
  children?: ReactNode;
  icon?: ReactNode;
}
export default function PageHeader({
  title,
  subTitle,
  children,
  icon,
}: IPageHeader) {
  return (
    <>
      <div
        className="p-4 relative"
        style={{
          background: "var(--background-content)",
          color: "var(--foreground-color)",
          position: "sticky",
          top: 0,
          zIndex:100
        }}
      >
        <div>
          <p className=" font-[400]  text-[30px]">{title}</p>
          <p className="text-[14px]">{subTitle}</p>
          <p className="absolute top-0 right-8 opacity-10">{icon}</p>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
}

"use client";

import { Search } from "@carbon/icons-react";
import { Button, SearchBar } from "antd-mobile";
interface IProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onSearch?: (val: string) => void;
  onBtnClick?: () => void;
}
export default function CusSearchBar({
  placeholder,
  value,
  onChange,
  onSearch,
  onBtnClick,
}: IProps) {
  return (
    <>
      <div className="flex flex-row gap-2 items-center mt-4">
        <div className="flex-1">
          <SearchBar
            placeholder={placeholder}
            value={value}
            onChange={(val) => onChange(val)}
            onSearch={(val) => onSearch && onSearch(val)}
            style={{
              "--border-radius": "100px",
              "--background": "#ffffff",
              "--height": "32px",
              "--padding-left": "12px",
            }}
          />
        </div>
        <div className="w=[40px]">
          <Button color="primary" size="small" onClick={onBtnClick}>
            <Search size={24}></Search>
          </Button>
        </div>
      </div>
    </>
  );
}

import { Mask } from "antd-mobile";
import React, { Dispatch } from "react";
import QrScanner from "react-qr-scanner";

interface IProps {
  rowId: number;
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  onResult: (rowId: number, val: string) => void;
}
export default function ScanQrCode({
  visible,
  setVisible,
  rowId,
  onResult,
}: IProps) {
  const handleScan = (data: string) => {
    if (data) {
      const result = (data as any).text;
      if (result) {
        onResult(rowId, result);
        setVisible(false);
      }
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <>
      <Mask
        className="p-10 flex flex-col  mt-[48px] content-center"
        visible={visible}
        destroyOnClose={true}
        onMaskClick={() => setVisible(false)}
      >
        <div>
          <QrScanner
            onError={(e: any) => handleError(e)}
            onScan={(data: any) => handleScan(data)}
            style={{ width: "100%" }}
          />
        </div>
      </Mask>
    </>
  );
}

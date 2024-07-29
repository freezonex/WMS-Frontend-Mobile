import { Mask } from "antd-mobile";
import React, { Dispatch, useEffect, useRef } from "react";
import "webrtc-adapter";
import { BrowserMultiFormatReader } from "@zxing/library";

let codeReader: any;
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
  const refAudio = useRef<any>(null);

  useEffect(() => {
    const audio = refAudio.current;
    if (audio) {
      audio.preload = "auto";
      // audio.src = "/assets/sound/scan1.mp3";
    }
  }, []);
  useEffect(() => {
    if (visible) {
      startScan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleScan = (data: string) => {
    if (data) {
      console.log(data);
      const result = (data as any).text;
      if (result) {
        onResult(rowId, result);
        handleStopScan("");
      }
    }
  };
  const startScan = async () => {
    codeReader = new BrowserMultiFormatReader();
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices: any) => {
        let firstDeviceId = videoInputDevices[0].deviceId;
        const videoInputDeviceslablestr = JSON.stringify(
          videoInputDevices[0].label
        );
        if (videoInputDevices.length > 1) {
          if (videoInputDeviceslablestr.indexOf("back") > -1) {
            firstDeviceId = videoInputDevices[0].deviceId;
          } else {
            firstDeviceId = videoInputDevices[1].deviceId;
          }
          if (videoInputDevices.length > 2) {
            firstDeviceId = videoInputDevices[2].deviceId;
          }
        }
        codeReader && codeReader.reset();
        decodeFromInputVideoFunc(firstDeviceId);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  const decodeFromInputVideoFunc = (firstDeviceId: string) => {
    console.log("dcid", firstDeviceId);
    const video = document.querySelector("#video");

    codeReader.decodeFromVideoDevice(
      firstDeviceId,
      video,
      (result: any, err: any) => {
        if (result) {
          if (result.text) {
            handleScan(result);
            playAudio();
          }
        }
        if (err && !err) {
          console.error(err);
        }
      }
    );
  };

  const playAudio = () => {
    const audio = refAudio.current;
    if (audio) {
      audio.play();
    }
  };

  const handleStopScan = (result: any) => {
    codeReader && codeReader.reset();
    codeReader = null;
    setVisible(false);
  };
  return (
    <>
      <Mask
        className="p-10 flex flex-col  mt-[48px] content-center"
        visible={visible}
        destroyOnClose={true}
        onMaskClick={() => {
          handleStopScan("");
        }}
      >
        <div className="flex flex-col items-center">
          <video
            // style={{ minHeight: "375px", minWidth: "375px" }}
            id="video"
          ></video>
        </div>
        <audio ref={refAudio} src="/assets/sound/scan1.mp3"></audio>
      </Mask>
    </>
  );
}

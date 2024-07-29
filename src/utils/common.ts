import { Dialog } from "antd-mobile";

const cusDlg = {
  confirm(msg: string, callback: () => void) {
    Dialog.confirm({
      content: msg,
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: async () => {
        callback();
      },
    });
  },
};

export { cusDlg };

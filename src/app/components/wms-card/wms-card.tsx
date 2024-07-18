"use client";

import { OverflowMenuVertical } from "@carbon/icons-react";
import { ActionSheet } from "antd-mobile";
import { Action } from "antd-mobile/es/components/action-sheet";
import { useState } from "react";

interface IWmsCardProps {
  title: string;
  children: React.ReactElement|React.ReactElement[];
  onEdit?: Function;
  onDelete?: Function;
  hasEdit?: boolean;
  hasDelete?: boolean;
}
export default function WmsCard({
  title,
  children,
  hasEdit,
  hasDelete,
  onEdit,
  onDelete,
}: IWmsCardProps) {
  const allActions: Action[] = [
    {
      key: "edit",
      text: "Edit",
      bold: true,
      disabled: !hasEdit,
      onClick: () => {
        if (hasEdit && onEdit) {
          onEdit();
        }
      },
    },
    {
      key: "delete",
      text: "Delete",
      bold: true,
      disabled: !hasDelete,
      onClick: () => {
        if (hasDelete && onDelete) {
          onDelete();
        }
      },
    },
  ];
  const actions = allActions.filter((t) => !t.disabled);
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 16px" }}>
      <div className="flex flex-row items-center justify-between h-[34px] p-2 text-[14px]  font-semibold bg-[#C6C6C6]">
        <div>{title}</div>
        <div>
          {actions.length > 0 && (
            <OverflowMenuVertical
              onClick={() => {
                setVisible(true);
              }}
            />
          )}
        </div>
      </div>
      <div className="p-4 bg-white">{children}</div>
      <ActionSheet
        visible={visible}
        actions={actions}
        closeOnAction={true}
        extra="Please select your operation"
        cancelText="Cancel"
        onClose={() => setVisible(false)}
      />
    </div>
  );
}

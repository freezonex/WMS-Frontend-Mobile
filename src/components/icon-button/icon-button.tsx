import { Add } from "@carbon/icons-react";
import { Button } from "antd-mobile";

interface IIconButton {
  text: string;
  children?: React.ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
}
export default function IconButton({
  text,
  children: childrenIcon,
  onClick,
}: IIconButton) {
  let buttonIcon = <Add size={24} className="ml-4" color="white"></Add>;
  if (childrenIcon) {
    buttonIcon = childrenIcon as any;
  }
  return (
    <>
      <Button color="primary" size="small" onClick={onClick}>
        <div className=" flex flex-row items-center">
          <div>{text}</div>
          <div> {buttonIcon}</div>
        </div>
      </Button>
    </>
  );
}

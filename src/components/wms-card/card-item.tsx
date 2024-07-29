export default function CardItem({ name, value, children }: any) {
  return (
    <>
      <div className="flex flex-row items-center justify-between pb-[5px]">
        <div>{name}</div>
        <div>{children ? children : value}</div>
      </div>
    </>
  );
}

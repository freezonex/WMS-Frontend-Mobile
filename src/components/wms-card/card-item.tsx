export default function CardItem({ name, value, children }: any) {
  return (
    <>
      <div className="flex flex-row items-center justify-between pb-[5px]">
        <div>{name}</div>
        {children && <div>{children}</div>}
        {!children && (
          <div className="pl-6 text-nowrap text-ellipsis  overflow-hidden">
            {value}
          </div>
        )}
      </div>
    </>
  );
}

"use client";
interface IParams {
  params: {
    id: string;
  };
}
export default function InboundMaterials({ params }: IParams) {
  return <>InboundId-{params.id} for fetch materials</>;
}

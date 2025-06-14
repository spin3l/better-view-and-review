import { type ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onClick: () => void;
  fillColor: string;
}

function MovieBillboardAction({ icon, onClick, fillColor }: Props) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-200 rounded-full size-10 hover:scale-110 hover:cursor-pointer ${fillColor}`}
      onClick={onClick}
    >
      <div>{icon}</div>
    </div>
  );
}

export default MovieBillboardAction;

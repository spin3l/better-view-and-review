import { type ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

function MovieBillboardAction({ icon, onClick }: Props) {
  return (
    <div
      className="flex items-center justify-center bg-secondary-foreground rounded-full size-10 transition-300 ease-in-out transition-transform hover:scale-110 hover:cursor-pointer hover:text-accent"
      onClick={onClick}
    >
      <div>{icon}</div>
    </div>
  );
}

export default MovieBillboardAction;

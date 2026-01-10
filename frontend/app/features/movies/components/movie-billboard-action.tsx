"use client";
import { animated, useSpring } from "@react-spring/web";
import { useState, type ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

function MovieBillboardAction({ icon, onClick }: Props) {
  const [state, toggle] = useState(false);

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 100 },
  });

  return (
    <animated.div
      className="flex items-center justify-center bg-red-500 rounded-full size-10 hover:cursor-pointer hover:text-green-200 hover:scale-110"
      onClick={() => {
        onClick && onClick();
        toggle((prev) => !prev);
      }}
      style={{
        scale: x.to({
          range: [0, 0.5, 0.75, 1],
          output: [1, 1.2, 1.1, 1],
        }),
      }}
    >
      <div>{icon}</div>
    </animated.div>
  );
}

export default MovieBillboardAction;

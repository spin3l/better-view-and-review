import { Link } from "react-router";

interface Props {
  name: string;
}

function GenrePill({ name }: Props) {
  return (
    <Link
      to={{
        pathname: `/genres`,
        search: `?genre=${name}`,
      }}
      className="pointer-events-auto hover:underline"
    >
      {name}
    </Link>
  );
}

export default GenrePill;

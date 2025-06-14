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
      className="hover:underline"
    >
      {name}
    </Link>
  );
}

export default GenrePill;

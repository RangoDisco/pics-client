import { useRouter } from "next/router";
import { FC } from "react";

const Collection: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>{id}</p>;
};

export default Collection;

import { useRouter } from "next/router";
import { FC } from "react";

const Picture: FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <p>{pid}</p>;
};

export default Picture;

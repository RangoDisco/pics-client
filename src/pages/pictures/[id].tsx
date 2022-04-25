import { useRouter } from "next/router";
import { FC } from "react";
import Image from "next/image";

const FullPicture: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const url =
    "https://images.unsplash.com/photo-1602719092282-f027126b6b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";
  return (
    <section className="bg-richBlack h-screen">
      <div className="p-4 w-full h-full">
        <a href={url} target="_blank" rel="noreferrer">
          <Image src={url} alt="picture" layout="fill" objectFit="contain" />
        </a>
      </div>
    </section>
  );
};

export default FullPicture;

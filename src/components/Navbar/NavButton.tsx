import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

interface IProps {
  title: string;
  pathName: string;
}
const NavButton: FC<IProps> = ({ title, pathName }: IProps) => {
  const router = useRouter();
  const [isCurrentPath, setIsCurrentPath] = useState(false);

  useEffect(() => {
    setIsCurrentPath(router.asPath === pathName);
  }, [router, pathName]);

  return (
    <Link href={pathName} passHref>
      <p
        className={`transition:colors duration-200 hover:text-rose dark:hover:text-munsellBlue cursor-pointer ${
          isCurrentPath && "text-rose dark:text-munsellBlue underline"
        }`}
      >
        {title}
      </p>
    </Link>
  );
};

export default NavButton;

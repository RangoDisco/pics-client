import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

interface IProps {
  title: string;
  pathName: string;
  setIsMobileDropdownOpen?: any;
}
const NavButton: FC<IProps> = ({
  title,
  pathName,
  setIsMobileDropdownOpen,
}: IProps) => {
  const router = useRouter();
  const [isCurrentPath, setIsCurrentPath] = useState(false);

  useEffect(() => {
    setIsCurrentPath(router.asPath === pathName);
  }, [router, pathName]);

  const navToPathname = () => {
    setIsMobileDropdownOpen(false);
    router.push(pathName);
  };

  return (
    <p
      onClick={navToPathname}
      className={`transition:colors duration-200 hover:text-rose dark:hover:text-munsellBlue cursor-pointer ${
        isCurrentPath && "text-rose dark:text-munsellBlue underline"
      }`}
    >
      {title}
    </p>
  );
};

export default NavButton;

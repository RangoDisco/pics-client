import Link from "next/link";
import { FC } from "react";

const NavBar: FC = () => {
  return (
    <div className="bg-raisinBlack p-4 flex flex-row justify-between">
      <Link href="/" passHref>
        <h1 className="text-honeyYellow cursor-pointer">Pic-Nic</h1>
      </Link>
      <div className="flex flex-row gap-20">
        <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
          Random
        </p>
        <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
          Random
        </p>
        <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
          Random
        </p>
        <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
          Random
        </p>
      </div>
      <p className="justify-self-end">Sign Out</p>
    </div>
  );
};

export default NavBar;

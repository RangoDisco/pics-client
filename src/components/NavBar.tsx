import Link from "next/link";
import { FC } from "react";

const NavBar: FC = () => {
  return (
    <div className="bg-raisinBlack p-4 flex flex-row justify-between text-ghostWhite sticky top-0 z-50">
      <Link href="/" passHref>
        <h1 className="text-honeyYellow cursor-pointer">Pic-Nic</h1>
      </Link>
      <div className="flex flex-row gap-20">
        <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
          Random
        </p>
        <Link href="/collections" passHref>
          <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
            Collections
          </p>
        </Link>
        <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
          Random
        </p>
        <Link href="/upload" passHref>
          <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
            Upload
          </p>
        </Link>
      </div>
      <p className="justify-self-end cursor-pointer">Sign Out</p>
    </div>
  );
};

export default NavBar;

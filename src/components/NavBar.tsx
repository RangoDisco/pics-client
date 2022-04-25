import Link from "next/link";
import { FC } from "react";
import { FaSignOutAlt as SignOutIcon, FaCameraRetro } from "react-icons/fa";

const NavBar: FC = () => {
  return (
    <div className="bg-raisinBlack p-4 flex flex-row justify-between items-center text-ghostWhite sticky top-0 z-50">
      <Link href="/" passHref>
        <div className="transition-color duration-200 hover:text-munsellBlue cursor-pointer">
          <FaCameraRetro size={26} />
        </div>
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
      <p className="mr-2 justify-self-end cursor-pointer">
        <SignOutIcon className="transition-color duration-200 hover:text-munsellBlue" />
      </p>
    </div>
  );
};

export default NavBar;

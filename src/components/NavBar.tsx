import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FC } from "react";
import { FaSignOutAlt as SignOutIcon, FaCameraRetro } from "react-icons/fa";
import { useAuth } from "../contexts/Auth/AuthProvider";

const NavBar: FC = () => {
  const router = useRouter();
  const { signOut, currentUser } = useAuth();

  const handleSignOut = () => {
    signOut();
    Router.push("/signin");
  };

  return (
    <>
      {router.asPath !== "/signin" && currentUser && (
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
            {currentUser && currentUser.role === "Admin" && (
              <Link href="/upload" passHref>
                <p className="transition:colors duration-200 hover:text-munsellBlue hover:cursor-pointer">
                  Upload
                </p>
              </Link>
            )}
          </div>
          <p
            className="mr-2 justify-self-end cursor-pointer"
            onClick={handleSignOut}
          >
            <SignOutIcon className="transition-color duration-200 hover:text-munsellBlue" />
          </p>
        </div>
      )}
    </>
  );
};

export default NavBar;

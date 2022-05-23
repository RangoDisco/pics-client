import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FC } from "react";
import { RiCameraLensFill, RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth } from "../../contexts/Auth/AuthProvider";
import NavButton from "./NavButton";

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
            <div className="transition-color duration-200 hover:text-munsellBlue cursor-pointer flex flex-row items-center">
              <RiCameraLensFill size={32} />
              <h1 className="ml-2 text-lg">Pics</h1>
            </div>
          </Link>
          <div className="flex flex-row lg:gap-20 md:gap-10 gap-5">
            <NavButton title="Photos" pathName="/" />
            <NavButton title="Collections" pathName="/collections" />
            <NavButton title="Random" pathName="/pictures/random" />
            {currentUser && currentUser.role === "Admin" && (
              <NavButton title="Upload" pathName="/upload" />
            )}
          </div>
          <p
            className="mr-2 justify-self-end cursor-pointer"
            onClick={handleSignOut}
          >
            <RiLogoutBoxRLine
              size={22}
              className="transition-color duration-200 hover:text-munsellBlue"
            />
          </p>
        </div>
      )}
    </>
  );
};

export default NavBar;

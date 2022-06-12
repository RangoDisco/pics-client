import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  RiCameraLensFill,
  RiLogoutBoxRLine,
  RiMoonFill,
  RiSunFill,
} from "react-icons/ri";
import { useAuth } from "../../contexts/Auth/AuthProvider";
import NavButton from "./NavButton";

const NavBar: FC = () => {
  const [isMounted, setMounted] = useState(false);
  const router = useRouter();
  const { signOut, currentUser, fetchCurrentUser } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleSignOut = () => {
    signOut();
    Router.push("/signin");
  };

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const renderThemeIcons = () => {
    if (!isMounted) {
      return isMounted;
    }

    return theme === "light" ? (
      <RiMoonFill size={22} />
    ) : (
      <RiSunFill size={22} />
    );
  };

  return (
    <>
      {router.asPath !== "/signin" && (
        <div className="bg-creme dark:bg-raisinBlack p-4 flex flex-row justify-between items-center text-richBlack dark:text-ghostWhite sticky top-0 z-50">
          <div className="flex flex-row items-center w-3/4 lg:gap-10 md:gap-5 gap-2">
            <Link href="/" passHref>
              <div className="transition-color duration-200 hover:text-rose dark:hover:text-munsellBlue cursor-pointer flex flex-row items-center">
                <RiCameraLensFill size={32} />
              </div>
            </Link>
            <div className="flex flex-row lg:gap-10 md:gap-5 gap-2">
              <NavButton title="Collections" pathName="/collections" />
              <NavButton title="Random" pathName="/pictures/random" />
              {currentUser?.role === "Admin" && (
                <NavButton title="Upload" pathName="/upload" />
              )}
            </div>
          </div>
          <div className="flex flex-row justify-around w-1/6 lg:w-1/12 justify-self-end">
            <div
              onClick={handleChangeTheme}
              className="transition-color duration-200 hover:text-rose  dark:hover:text-munsellBlue hover:cursor-pointer"
            >
              {renderThemeIcons()}
            </div>
            <div
              className="mr-2 justify-self-end cursor-pointer"
              onClick={handleSignOut}
            >
              <RiLogoutBoxRLine
                size={22}
                className="transition-color duration-200 hover:text-rose dark:hover:text-munsellBlue"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

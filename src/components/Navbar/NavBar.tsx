import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FC, useEffect } from "react";
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
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <>
      {router.asPath !== "/signin" && currentUser && (
        <div className="bg-silk dark:bg-raisinBlack p-4 flex flex-row justify-between items-center text-richBlack dark:text-ghostWhite sticky top-0 z-50">
          <Link href="/" passHref>
            <div className="transition-color duration-200 hover:text-rose dark:hover:text-munsellBlue cursor-pointer flex flex-row items-center">
              <RiCameraLensFill size={32} />
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
          <div className="flex flex-row justify-around w-1/6 lg:w-1/12">
            <div>
              <p onClick={handleChangeTheme} className="hover:cursor-pointer">
                {theme === "light" ? (
                  <RiMoonFill
                    size={22}
                    className="transition-color duration-200 hover:text-rose"
                  />
                ) : (
                  <RiSunFill
                    size={22}
                    className="transition-color duration-200 hover:text-munsellBlue"
                  />
                )}
              </p>
            </div>
            <div>
              <p
                className="mr-2 justify-self-end cursor-pointer"
                onClick={handleSignOut}
              >
                <RiLogoutBoxRLine
                  size={22}
                  className="transition-color duration-200 hover:text-rose dark:hover:text-munsellBlue"
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

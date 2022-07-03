import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  RiCameraLensFill,
  RiMenuLine,
  RiMoonFill,
  RiSunFill,
} from "react-icons/ri";
import { useAuth } from "../../contexts/Auth/AuthProvider";
import NavButton from "./NavButton";
import UserDropdown from "./UserDropdown";

const NavBar: FC = () => {
  const [isMounted, setMounted] = useState(false);
  const [isMobileDropDownOpen, setIsMobileDropDownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { currentUser, fetchCurrentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/signin");
  };

  const redirectToProfile = () => {
    router.push("/profile");
    setIsDropdownOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        <>
          <div className="bg-creme dark:bg-raisinBlack p-4 flex flex-row justify-between items-center text-richBlack dark:text-ghostWhite sticky top-0 z-50">
            {/* PC nav items */}
            <div className="flex flex-row items-center w-3/4 lg:gap-10 md:gap-5 gap-2">
              <Link href="/" passHref>
                <div
                  className={`transition-color duration-200 hover:text-rose dark:hover:text-munsellBlue cursor-pointer flex flex-row items-center ${
                    router.asPath === "/" && "text-rose dark:text-munsellBlue"
                  }`}
                >
                  <RiCameraLensFill size={32} />
                </div>
              </Link>
              <div className="hidden sm:flex flex-row lg:gap-10 md:gap-5 gap-2">
                <NavButton title="Collections" pathName="/collections" />
                <NavButton title="Random" pathName="/pictures/random" />
                {currentUser?.role === "Admin" && (
                  <NavButton title="Upload" pathName="/upload" />
                )}
              </div>
            </div>
            <div className="hidden lg:flex flex-row justify-around w-1/6 lg:w-1/12 justify-self-end">
              <div
                onClick={handleChangeTheme}
                className="transition-color duration-200 hover:text-rose  dark:hover:text-munsellBlue hover:cursor-pointer"
              >
                {renderThemeIcons()}
              </div>
              <div className="mr-2 justify-self-end cursor-pointer">
                <UserDropdown
                  isMounted={isMounted}
                  isDropdownOpen={isDropdownOpen}
                  handleToggleDropdown={handleToggleDropdown}
                  redirectToProfile={redirectToProfile}
                  handleSignOut={handleSignOut}
                />
              </div>
            </div>

            {/* Burger Menu Icon */}
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => {
                setIsMobileDropDownOpen(!isMobileDropDownOpen);
              }}
            >
              <RiMenuLine size={22} color="black" />
            </button>
          </div>
          {/* Mobile items */}
          {isMobileDropDownOpen && (
            <div className="flex flex-col px-4 justify-around lg:hidden mr-10 bg-silk dark:bg-richBlack absolute w-full mt-2 rounded-md shadow-lg border border-1 py-2 border-davysGrey z-10">
              <div className="py-2">
                <NavButton
                  title="Collections"
                  pathName="/collections"
                  setIsMobileDropdownOpen={setIsMobileDropDownOpen}
                />
              </div>
              <hr />
              <div className="py-2">
                <NavButton
                  title="Random"
                  pathName="/pictures/random"
                  setIsMobileDropdownOpen={setIsMobileDropDownOpen}
                />
              </div>
              <hr />

              {currentUser?.role === "Admin" && (
                <>
                  <div className="py-2">
                    <NavButton
                      title="Upload"
                      pathName="/upload"
                      setIsMobileDropdownOpen={setIsMobileDropDownOpen}
                    />
                  </div>
                  <hr />
                </>
              )}
              <div className="py-2">
                <NavButton
                  title="Profile"
                  pathName="/profile"
                  setIsMobileDropdownOpen={setIsMobileDropDownOpen}
                />
              </div>
              <hr />
              <div className="py-2">
                <span onClick={handleChangeTheme}>Change theme</span>
              </div>
              <hr />
              <div className="py-2">
                <span>Sign out</span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NavBar;

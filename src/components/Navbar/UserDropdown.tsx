import { useAuth } from "../../contexts/Auth/AuthProvider";
import Avatar from "boring-avatars";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface IProps {
  isMounted: boolean;
  isDropdownOpen: boolean;
  handleToggleDropdown: () => void;
  redirectToProfile: () => void;
  handleSignOut: () => void;
}

const UserDropdown = ({
  isMounted,
  isDropdownOpen,
  handleToggleDropdown,
  redirectToProfile,
  handleSignOut,
}: IProps) => {
  const { currentUser, profilePictureVariant, setProfilePictureVariant } =
    useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!localStorage.getItem("profilePictureVariant")) {
      setProfilePictureVariant("ring");
      localStorage.setItem("profilePictureVariant", "ring");
    }
  }, [profilePictureVariant, setProfilePictureVariant]);

  return (
    <>
      {isMounted && (
        <div>
          {currentUser && (
            <div onClick={handleToggleDropdown}>
              <Avatar
                size={22}
                name={currentUser?.username}
                variant={profilePictureVariant}
                colors={
                  theme === "light"
                    ? ["#D5869C", "#ffd6a5", "#ffadad"]
                    : ["#7FB685", "#188FA7", "#F7B32B"]
                }
              />
            </div>
          )}
          {isDropdownOpen && (
            <div
              className="origin-top-right mr-10 bg-silk dark:bg-richBlack absolute right-0 mt-2 w-36 rounded-md shadow-lg border border-1 border-davysGrey py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <span
                className="transition-all duration-200 px-4 py-0.5 my-0.5 flex w-full hover:bg-creme dark:hover:bg-raisinBlack"
                onClick={redirectToProfile}
              >
                Profile
              </span>
              <hr className="my-2" />
              <span
                className="transition-all duration-200 px-4 py-0.5 my-0.5 flex w-full hover:bg-creme dark:hover:bg-raisinBlack"
                onClick={handleSignOut}
              >
                Sign out
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserDropdown;

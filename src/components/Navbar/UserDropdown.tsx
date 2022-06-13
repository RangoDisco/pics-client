import { useAuth } from "../../contexts/Auth/AuthProvider";
import Avatar from "boring-avatars";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme } from "next-themes";

interface IProps {
  isMounted: boolean;
}

const UserDropdown = ({ isMounted }: IProps) => {
  const [isDropwdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser, signOut, profilePictureVariant } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const handleSignOut = () => {
    signOut();
    router.push("/signin");
  };

  const redirectToProfile = () => {
    router.push("/profile");
    setIsDropdownOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropwdownOpen);
  };

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
          {isDropwdownOpen && (
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

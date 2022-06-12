import { useAuth } from "../../contexts/Auth/AuthProvider";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";

const UserDropdown = () => {
  const [isDropwdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/signin");
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropwdownOpen);
  };

  return (
    <>
      <div>
        <p>test</p>
        <RiArrowDropDownLine size={22} onClick={handleToggleDropdown} />

        <div
          className="origin-top-right bg-creme dark:bg-raisinBlack absolute right-0 mt-2 w-56 rounded-md shadow-lg border-davysGrey"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <p>test</p>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;

import { useAuth } from "../contexts/Auth/AuthProvider";
import Avatar from "boring-avatars";
import { useTheme } from "next-themes";
import { ChangeEvent, useEffect } from "react";
import { IProfilePictureType } from "../contexts/Auth/types";

const Profile = () => {
  const {
    currentUser,
    profilePictureVariant,
    setProfilePictureVariant,
    isVariantValid,
  } = useAuth();
  const { theme } = useTheme();

  const handleVariantChange = (event: ChangeEvent<{ value: string }>) => {
    if (isVariantValid(event.target.value)) {
      setProfilePictureVariant(event.target.value as IProfilePictureType);
      localStorage.setItem("profilePictureVariant", event.target.value);
    }
  };
  return (
    <>
      {currentUser && profilePictureVariant && (
        <div className="p-2 flex flex-col items-center justify-center">
          <h2 className="text-richBlack dark:text-ghostWhite text-2xl mb-10">
            Change profile picture
          </h2>
          <Avatar
            size={150}
            name={currentUser?.username}
            variant={profilePictureVariant}
            colors={
              theme === "light"
                ? ["#D5869C", "#ffd6a5", "#ffadad"]
                : ["#7FB685", "#188FA7", "#F7B32B"]
            }
          />
          <select
            onChange={handleVariantChange}
            defaultValue={profilePictureVariant}
            className="mt-10 bg-silk dark:bg-richBlack text-md text- w-3/4 md:w-3/6 lg:w-1/6 text-richBlack dark:text-ghostWhite p-2.5 px-0 border-0 border-b-2 cursor-pointer"
          >
            <option value="ring">Ring</option>
            <option value="marble">Marble</option>
            <option value="beam">Beam</option>
            <option value="pixel">Pixel</option>
            <option value="sunset">Sunset</option>
            <option value="bauhaus">Bauhaus</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Profile;

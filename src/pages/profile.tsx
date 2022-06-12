import { useAuth } from "../contexts/Auth/AuthProvider";
import Avatar from "boring-avatars";
import { useTheme } from "next-themes";
import { ChangeEvent } from "react";
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
      {currentUser && (
        <div>
          <Avatar
            size={64}
            name={currentUser?.username}
            variant={profilePictureVariant}
            colors={
              theme === "light"
                ? ["#188FA7", "#F7B32B", "#7FB685"]
                : ["#FCF9EE", "#F9F4DE", "#D5869C"]
            }
          />
          <select onChange={handleVariantChange}>
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

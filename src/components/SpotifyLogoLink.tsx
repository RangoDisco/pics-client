import { FC } from "react";
import { FaSpotify } from "react-icons/fa";

interface IProps {
  size: number;
  musicLink: string;
}

const SpotifyLogoLink: FC<IProps> = ({ size, musicLink }: IProps) => {
  const handleSpotifyClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    window.open(musicLink, "_blank");
  };
  return (
    <FaSpotify
      size={size}
      className="cursor-pointer hover:text-munsellBlue"
      onClick={handleSpotifyClick}
    />
  );
};

export default SpotifyLogoLink;

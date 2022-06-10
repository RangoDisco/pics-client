import { FC } from "react";
import { RiSpotifyFill } from "react-icons/ri";

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
    <RiSpotifyFill
      size={size}
      className="cursor-pointer hover:text-rose dark:hover:text-munsellBlue"
      onClick={handleSpotifyClick}
    />
  );
};

export default SpotifyLogoLink;

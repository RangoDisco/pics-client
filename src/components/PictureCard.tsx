import Image from "next/image";
import { FC, forwardRef } from "react";

export interface IProps {
  title: string;
  url: string;
  date: string;
  location: string;
}
const PictureCard = forwardRef(function PictureCard(
  { title, url, date, location }: IProps,
  ref
) {
  return (
    <article className="w-full h-250 bg-raisinBlack mborder-solid transition-colors duration-200 hover:cursor-pointer overflow-hidden">
      <div className="w-full h-3/4 transition:all duration-500 hover:h-full relative">
        <Image src={url} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="m-2">
        <p className="text-munsellBlue">{title}</p>
        <p>{date}</p>
        <p>{location}</p>
      </div>
    </article>
  );
});

export default PictureCard;

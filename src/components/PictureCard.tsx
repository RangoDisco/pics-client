import Image from "next/image";
import Link from "next/link";
import { FC, forwardRef } from "react";

export interface IProps {
  id: number;
  title: string;
  url: string;
  date: string;
  location: string;
}
const PictureCard = forwardRef(function PictureCard(
  { id, title, url, date, location }: IProps,
  ref
) {
  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      <article className="w-full h-96 bg-raisinBlack transition-colors duration-200 hover:cursor-pointer overflow-hidden shadow-lg rounded-md">
        <div className="w-full h-3/4 transition:all duration-500 hover:h-full relative hover:mb-5">
          <Image src={url} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="-mt-5 relative z-30">
          <div className="bg-raisinBlack p-6">
            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate text-munsellBlue">
              {title}
            </h4>
            <div className="opacity-70 uppercase text-xs tracking-wider">
              {date}
            </div>
            <div className="mt-2 uppercase text-xs font-semibold tracking-wider">
              {location}
            </div>
          </div>
        </div>
      </article>
    </a>
  );
});

export default PictureCard;

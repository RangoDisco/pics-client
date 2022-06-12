import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

export interface IProps {
  id: number;
  url: string;
  date: Date;
  location: string;
}
const PictureCard = forwardRef(function PictureCard(
  { id, url, date, location }: IProps,
  ref
) {
  return (
    <Link href={`/pictures/${id}`} passHref>
      <article className="w-full h-96 bg-creme dark:bg-raisinBlack transition-colors duration-200 hover:cursor-pointer overflow-hidden shadow-lg rounded-md">
        <div className="w-full h-3/4 transition:all duration-500 hover:h-full relative hover:mb-5">
          <Image
            role="image"
            id={`picture-${id}`}
            src={url}
            alt={`picture-${id}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-30">
          <div className="bg-creme dark:bg-raisinBlack p-6">
            <div
              role="date"
              className="opacity-70 uppercase text-xs tracking-wider"
            >
              {date && new Date(date).toISOString().split("T")[0]}
            </div>
            <div
              role="location"
              className="mt-2 uppercase text-xs font-semibold tracking-wider"
            >
              {location}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
});

export default PictureCard;

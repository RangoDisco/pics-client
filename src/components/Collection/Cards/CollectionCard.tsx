import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ICollection, IPicture } from "../../../contexts/Pictures/types";
import getISODate from "../../../helpers/getIsoDate";
import SpotifyLogoLink from "../../SpotifyLogoLink";

const CollectionCard: FC<ICollection> = ({
  title,
  id,
  pictures,
  musicLink,
  category,
  date,
  description,
  tags,
}: ICollection) => {
  return (
    <Link href={`/collections/${id}`} passHref>
      <article className="w-full h-96 transition-colors duration-200 hover:cursor-pointer overflow-hidden">
        <div className="w-full h-3/4 flex flex-row">
          {pictures &&
            pictures.length > 0 &&
            pictures.map(
              (picture: IPicture, index: number) =>
                index < 3 && (
                  <div
                    className={`w-1/3 h-full relative border border-solid border-creme dark:border-raisinBlack rounded-lg ${
                      index === 0
                        ? "z-0 mt-5"
                        : index === 1
                        ? "z-0 w-2/4 transition-all duration-200 hover:w-full"
                        : "z-0 mt-5"
                    }`}
                    key={index}
                  >
                    <Image
                      src={`${picture.contentUrl}`}
                      alt={`collection-picture-${picture.id}`}
                      layout="fill"
                      objectFit="cover"
                      className={`rounded-md ${
                        index === 0
                          ? "rounded-r-none"
                          : index === 2
                          ? "rounded-l-none"
                          : null
                      }`}
                    />
                  </div>
                )
            )}
        </div>
        <div className="px-4 -mt-20 relative z-30">
          <div className="bg-creme dark:bg-raisinBlack p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span
                role="category"
                className="bg-rose dark:bg-munsellBlue text-ghostWhite text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide"
              >
                {category.title}
              </span>
              {tags &&
                tags.length > 0 &&
                tags.map((tag, index) => (
                  <div
                    role="tag"
                    className="ml-2 opacity-70 uppercase text-xs font-semibold tracking-wider"
                    key={index}
                  >
                    {tag.title || "Paysage"} {index !== tags.length - 1 && "???"}
                  </div>
                ))}
            </div>

            <h4
              role="collection-title"
              className="mt-1 text-xl font-semibold uppercase leading-tight truncate"
            >
              {title}
            </h4>

            <div className="mt-1">
              <span className=" text-sm" role="date">
                {getISODate(date)}
              </span>
            </div>
            <div className="mt-1">
              <span className="text-sm">{description}</span>
            </div>
            <div className="w-full flex justify-end" role="musicLink">
              <SpotifyLogoLink size={18} musicLink={musicLink} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CollectionCard;

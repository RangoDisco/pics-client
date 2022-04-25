import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, MouseEventHandler } from "react";
import { ICollection, IPicture } from "../contexts/Pictures/types";
import { FaSpotify } from "react-icons/fa";

const CollectionCard: FC<ICollection> = (collection) => {
  const handleSpotifyClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    window.open(collection.musicLink, "_blank");
  };
  return (
    <Link href={`/collections/${collection.id}`} passHref>
      <article className="w-full h-96 transition-colors duration-200 hover:cursor-pointer overflow-hidden">
        <div className="w-full h-3/4 flex flex-row">
          {collection.pictures &&
            collection.pictures.length > 0 &&
            collection.pictures.map((picture: IPicture, index: number) => (
              <div
                className={`w-1/3 h-full relative border border-solid border-raisinBlack rounded-lg ${
                  index === 0
                    ? "z-0 mt-5"
                    : index === 1
                    ? "z-0 w-2/4 transition-all duration-200 hover:w-full hover:z-20"
                    : "z-0 mt-5"
                }`}
                key={index}
              >
                <Image
                  src={picture.contentUrl}
                  alt="random image"
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
            ))}
        </div>
        <div className="px-4 -mt-20 relative z-30">
          <div className="bg-raisinBlack p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span className="bg-munsellBlue text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                {collection.category || "Street"}
              </span>
              {collection.tags &&
                collection.tags.length > 0 &&
                collection.tags.map((tag, index) => (
                  <div
                    className="ml-2 opacity-70 uppercase text-xs font-semibold tracking-wider"
                    key={index}
                  >
                    {tag || "Paysage"}{" "}
                    {index !== collection.tags.length - 1 && "⋅"}
                  </div>
                ))}
            </div>

            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
              {collection.title || "A random Title"}
            </h4>

            <div className="mt-1">
              <span className=" text-sm">
                {collection.date ? collection.date.toString() : "various"}
              </span>
            </div>
            <div className="mt-1">
              <span className="text-sm">{collection.description}</span>
            </div>
            <div className="w-full flex justify-end">
              <FaSpotify
                className="cursor-pointer hover:text-munsellBlue"
                onClick={handleSpotifyClick}
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CollectionCard;

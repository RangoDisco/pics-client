import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
interface IProps {
  id: number;
  title: string;
  date: Date | string;
  description: string;
  previewPics: string[];
  genre: string;
  tags: string[];
}
const CollectionCard: FC<IProps> = ({
  id,
  title,
  date,
  description,
  previewPics,
  genre,
  tags,
}: IProps) => {
  tags = ["Fourvière", "Printemps"];
  previewPics = [
    "https://images.unsplash.com/photo-1602087594298-706ccc894bfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80",
    "https://images.unsplash.com/photo-1650279902445-ed77fe27ac61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    "https://images.unsplash.com/photo-1602087594298-706ccc894bfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80",
  ];
  return (
    <Link href={`/collections/${id}`} passHref>
      <article className="w-full h-96 transition-colors duration-200 hover:cursor-pointer overflow-hidden">
        <div className="w-full h-3/4 flex flex-row">
          {previewPics &&
            previewPics.length > 0 &&
            previewPics.map((pic, index) => (
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
                  src={pic}
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
        <div className="px-4 -mt-16 relative z-30">
          <div className="bg-raisinBlack p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span className="bg-munsellBlue text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                {genre || "Street"}
              </span>
              {tags &&
                tags.length > 0 &&
                tags.map((tag, index) => (
                  <div
                    className="ml-2 opacity-70 uppercase text-xs font-semibold tracking-wider"
                    key={index}
                  >
                    {tag || "Paysage"} {index !== tags.length - 1 && "⋅"}
                  </div>
                ))}
            </div>

            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
              {title || "A random Title"}
            </h4>

            <div className="mt-1">
              <span className=" text-sm"> {date || "various"}</span>
            </div>
            <div className="mt-4">
              <span className="text-sm">
                {description || "Une superbe description"}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CollectionCard;

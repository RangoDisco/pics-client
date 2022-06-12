import { FC } from "react";
import { IPicture } from "../../contexts/Pictures/types";
import PictureCard from "./Cards/PictureCard";
import PictureSkeleton from "./Cards/PictureSkeleton";

interface IProps {
  pictures: IPicture[];
}

const PicturesList: FC<IProps> = ({ pictures }: IProps) => {
  return (
    <section className="p-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
      {pictures?.length > 0
        ? pictures.map((picture) => (
            <PictureCard
              key={picture.id}
              id={picture.id}
              url={picture.contentUrl}
              date={picture.date}
              location={picture.location}
            />
          ))
        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => (
            <PictureSkeleton key={index} />
          ))}
    </section>
  );
};

export default PicturesList;

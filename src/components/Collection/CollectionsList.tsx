import { FC } from "react";
import { ICollection } from "../../contexts/Pictures/types";
import CollectionCard from "./Cards/CollectionCard";
import CollectionSkeleton from "./Cards/CollectionSkeleton";

interface IProps {
  collections: ICollection[];
}

const CollectionsList: FC<IProps> = ({ collections }: IProps) => {
  return (
    <section className="p-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
      {collections && collections.length > 0
        ? collections.map((collection: ICollection, index: number) => (
            <CollectionCard {...collection} key={`collection-${index}`} />
          ))
        : [0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <CollectionSkeleton key={index} />
          ))}
    </section>
  );
};

export default CollectionsList;

import { FC } from "react";
import CollectionCard from "../../components/Cards/Collection/CollectionCard";
import { ICollection } from "../../contexts/Pictures/types";
import { collectionArray } from "../../data";

const Collections: FC = () => {
  return (
    <section
      className="p-4 grid grid-cols-4 gap-6 bg-richBlack text-ghostWhite"
      style={{ minHeight: "94.1vh" }}
    >
      {collectionArray.map((collection: ICollection, index: number) => (
        <CollectionCard {...collection} key={`collection-${index}`} />
      ))}
    </section>
  );
};

export default Collections;

import { FC, useEffect } from "react";
import CollectionCard from "../../components/Cards/Collection/CollectionCard";
import CollectionSkeleton from "../../components/Cards/Collection/CollectionSkeleton";
import { usePics } from "../../contexts/Pictures/PicturesProvider";
import { ICollection } from "../../contexts/Pictures/types";

const Collections: FC = () => {
  const { collections, fetchCollections } = usePics();

  useEffect(() => {
    (async () => await fetchCollections())();
  }, [fetchCollections]);
  useEffect(() => {
    console.log(collections);
    console.log(collections && collections.length > 0);
  }, [collections]);
  return (
    <div className="bg-richBlack text-ghostWhite">
      <section
        className="p-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6"
        style={{ minHeight: "94.1vh" }}
      >
        {collections && collections.length > 0
          ? collections.map((collection: ICollection, index: number) => (
              <CollectionCard {...collection} key={`collection-${index}`} />
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <CollectionSkeleton key={index} />
            ))}
      </section>
    </div>
  );
};

export default Collections;

import { FC, useEffect } from "react";
import CollectionCard from "../../components/Cards/Collection/CollectionCard";
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
        {collections &&
          collections.length > 0 &&
          collections.map((collection: ICollection, index: number) => (
            <CollectionCard {...collection} key={`collection-${index}`} />
          ))}
      </section>
    </div>
  );
};

export default Collections;

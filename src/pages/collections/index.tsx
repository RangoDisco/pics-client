import Head from "next/head";
import { FC, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import CollectionCard from "../../components/Cards/Collection/CollectionCard";
import CollectionSkeleton from "../../components/Cards/Collection/CollectionSkeleton";
import { usePics } from "../../contexts/Pictures/PicturesProvider";
import { ICollection } from "../../contexts/Pictures/types";

const Collections: FC = () => {
  const { collections, collectionsTotalCount, fetchCollections, isLoading } =
    usePics();

  useEffect(() => {
    (async () => await fetchCollections(20, 0, []))();
  }, [fetchCollections]);

  return (
    <>
      <Head>
        <title>Pic-Nic Collections</title>
        <meta name="description" content="Page collections" />
      </Head>
      <div className="bg-richBlack text-ghostWhite">
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            if (!isLoading) {
              fetchCollections(20, collections.length, collections);
            }
          }}
          hasMore={collectionsTotalCount > collections.length}
        >
          <section className="p-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {collections && collections.length > 0
              ? collections.map((collection: ICollection, index: number) => (
                  <CollectionCard {...collection} key={`collection-${index}`} />
                ))
              : [0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <CollectionSkeleton key={index} />
                ))}
          </section>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Collections;

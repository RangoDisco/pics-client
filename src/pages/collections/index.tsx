import Head from "next/head";
import { FC, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import CollectionsList from "../../components/Collection/CollectionsList";
import { usePics } from "../../contexts/Pictures/PicturesProvider";

const Collections: FC = () => {
  const {
    collections,
    collectionsTotalCount,
    fetchCollections,
    isLoading,
    error,
  } = usePics();

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
        {error && <h2 className="p-4 text-center text-red">{error}</h2>}
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            if (!isLoading) {
              fetchCollections(20, collections.length, collections);
            }
          }}
          hasMore={collectionsTotalCount > collections.length}
        >
          <CollectionsList collections={collections} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Collections;

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { execQuery } from "../../../graphqlClient";
import CollectionsList from "../../components/Collection/CollectionsList";
import { FETCHCOLLECTIONS } from "../../contexts/Pictures/gql/queries";
import { usePics } from "../../contexts/Pictures/PicturesProvider";
import { ICollection } from "../../contexts/Pictures/types";

interface IProps {
  ssrCollections: ICollection[];
  ssrCollectionsTotalCount: number;
  ssrError: any;
}

const Collections: NextPage<IProps> = ({
  ssrCollections,
  ssrCollectionsTotalCount,
  ssrError,
}) => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collectionsTotalCount, setCollectionsTotalCount] = useState(0);
  const { fetchCollections, isLoading, error } = usePics();
  const router = useRouter();

  useEffect(() => {
    if (!ssrError) {
      setCollections(ssrCollections);
      setCollectionsTotalCount(ssrCollectionsTotalCount);
    } else if (ssrError === "Error: No token") {
      router.push("/signin");
    }
  }, [ssrCollections, ssrCollectionsTotalCount, ssrError, router]);

  const fetchNextPage = async () => {
    const res = await fetchCollections(20, collections.length);
    if (res) {
      setCollections((prevCollections) => [
        ...prevCollections,
        ...res.collections,
      ]);
      setCollectionsTotalCount(res.collectionsTotalCount);
    }
  };

  return (
    <>
      <Head>
        <title>Pic-Nic Collections</title>
        <meta name="description" content="Page collections" />
      </Head>
      <div className="bg-silk dark:bg-richBlack text-richBlack dark:text-ghostWhite">
        {error && <h2 className="p-4 text-center text-red">{error}</h2>}
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            if (!isLoading) {
              fetchNextPage();
            }
          }}
          hasMore={collectionsTotalCount > collections?.length}
        >
          <CollectionsList
            collections={
              collections.length === 0 ? ssrCollections : collections
            }
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await execQuery(
      FETCHCOLLECTIONS,
      {
        first: 20,
        after: 0,
      },
      { req }
    );
    return {
      props: {
        ssrCollections: res.data.collectionsPage.collections,
        ssrCollectionsTotalCount: res.data.collectionsPage.totalCount,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }
};

export default Collections;

import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { execQuery } from "../../helpers/graphqlClient";
import PicturesList from "../../components/Pictures/PicturesList";
import SpotifyLogoLink from "../../components/SpotifyLogoLink";
import { FETCHCOLLECTIONBYID } from "../../contexts/Pictures/gql/queries";
import { ICollection } from "../../contexts/Pictures/types";

interface IProps {
  collection: ICollection;
  error: any;
}

const Collection: FC<IProps> = ({ collection, error }: IProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error === "Error: No token") {
      router.push("/signin");
    }
  }, [error, router]);

  return (
    <>
      <Head>
        <title>Pic-Nic {collection?.title || "collection"}</title>
        <meta name="description" content="Page photos" />
      </Head>
      <div className="bg-silk dark:bg-richBlack text-richBlack dark:text-ghostWhite">
        {error && (
          <h2 className="p-4 text-center text-red">
            {error && "An error occurred"}
          </h2>
        )}
        <>
          <div className="p-4 flex justify-between">
            {collection && (
              <>
                <h4>{collection?.title}</h4>
                <SpotifyLogoLink size={24} musicLink={collection?.musicLink} />
              </>
            )}
          </div>
          <PicturesList pictures={collection?.pictures} />
        </>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  try {
    const res = await execQuery(
      FETCHCOLLECTIONBYID,
      { id: Number(params?.id) },
      { req }
    );

    return {
      props: {
        collection: res.data.collection,
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

export default Collection;

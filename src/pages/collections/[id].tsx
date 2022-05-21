import { ThreeBody } from "@uiball/loaders";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import PicturesList from "../../components/Pictures/PicturesList";
import SpotifyLogoLink from "../../components/SpotifyLogoLink";
import { usePics } from "../../contexts/Pictures/PicturesProvider";

const Collection: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { collection, fetchCollectionById, error } = usePics();

  useEffect(() => {
    (async () => id && (await fetchCollectionById(+id)))();
  }, [fetchCollectionById, id]);

  return (
    <>
      <Head>
        <title>Pic-Nic {collection?.title || "collection"}</title>
        <meta name="description" content="Page photos" />
      </Head>
      <div className="bg-richBlack text-ghostWhite">
        {error && <h2 className="p-4 text-center text-red">{error}</h2>}
        {collection ? (
          <>
            <div className="p-4 flex justify-between">
              <h4>{collection.title}</h4>
              <SpotifyLogoLink size={24} musicLink={collection.musicLink} />
            </div>
            <PicturesList pictures={collection?.pictures} />
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <ThreeBody size={35} speed={1.1} color="white" />
          </div>
        )}
      </div>
    </>
  );
};

export default Collection;

import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Image from "next/image";
import { usePics } from "../../contexts/Pictures/PicturesProvider";
import Head from "next/head";
import { ThreeBody } from "@uiball/loaders";

const FullPicture: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { picture, fetchPictureById, isLoading, error, fetchRandomPicture } =
    usePics();

  useEffect(() => {
    (async () => {
      id && id !== "random"
        ? await fetchPictureById(+id)
        : await fetchRandomPicture();
    })();
  }, [fetchPictureById, fetchRandomPicture, id]);

  return (
    <>
      <Head>
        <title>Pic-Nic {picture?.title || "photo"}</title>
        <meta name="description" content="Page photo" />
      </Head>
      <section className="bg-richBlack h-screen">
        {error && <h2 className="p-4 text-center text-red">{error}</h2>}
        {picture && !isLoading ? (
          <div className="p-4 w-full h-full">
            <a href={`${picture.contentUrl}`} target="_blank" rel="noreferrer">
              <Image
                src={`${picture.contentUrl}`}
                alt="picture"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <ThreeBody size={35} speed={1.1} color="white" />
          </div>
        )}
      </section>
    </>
  );
};

export default FullPicture;

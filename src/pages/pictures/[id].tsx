import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Image from "next/image";
import { usePics } from "../../contexts/Pictures/PicturesProvider";
import Head from "next/head";

const FullPicture: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { picture, fetchPictureById, isLoading, fetchRandomPicture } =
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
        {picture && !isLoading ? (
          <div className="p-4 w-full h-full">
            <a
              href={`http://localhost:4000/${picture.contentUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={`http://localhost:4000/${picture.contentUrl}`}
                alt="picture"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </div>
        ) : (
          <div className="flex justify-center items-center bg-richBlack h-full">
            <p className="animate-spin">Siu</p>
          </div>
        )}
      </section>
    </>
  );
};

export default FullPicture;

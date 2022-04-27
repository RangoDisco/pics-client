import type { NextPage } from "next";

import { useEffect } from "react";
import PictureCard from "../components/Cards/Picture/PictureCard";
import PictureSkeleton from "../components/Cards/Picture/PictureSkeleton";

import { usePics } from "../contexts/Pictures/PicturesProvider";

const Home: NextPage = () => {
  const { pictures, fetchPictures } = usePics();

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return (
    <div className="bg-richBlack text-ghostWhite">
      <section className="p-4 grid grid-cols-4 gap-6">
        {pictures?.length > 0 ? (
          pictures.map((picture) => (
            <PictureCard
              key={picture.id}
              id={picture.id}
              title={picture.title}
              url={picture.contentUrl}
              date={picture.date}
              location={picture.location}
            />
          ))
        ) : (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <PictureSkeleton key={index} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;

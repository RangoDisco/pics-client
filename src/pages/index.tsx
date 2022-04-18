import type { NextPage } from "next";
import Link from "next/link";
import PictureCard from "../components/PictureCard";
import { picturesArray } from "../data";

const Home: NextPage = () => {
  const pictures = picturesArray;
  return (
    <div className="bg-richBlack text-ghostWhite">
      <section className="p-4 grid grid-cols-4 gap-6">
        {pictures?.length > 0 &&
          pictures.map((picture) => (
            <PictureCard
              key={picture.id}
              id={picture.id}
              title={picture.title}
              url={picture.url}
              date={picture.date}
              location={picture.location}
            />
          ))}
      </section>
    </div>
  );
};

export default Home;

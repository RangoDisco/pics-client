import type { NextPage } from "next";
import Link from "next/link";
import PictureCard from "../components/PictureCard";
import { picturesArray } from "../data";

const Home: NextPage = () => {
  const pictures = picturesArray;
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="bg-richBlack text-ghostWhite"
    >
      <section
        style={{ height: "100vh" }}
        className="p-4 grid grid-cols-4 gap-4"
      >
        {pictures?.length > 0 &&
          pictures.map((picture) => (
            <Link key={picture.id} href={`/pictures/1`} passHref>
              <PictureCard
                title={picture.title}
                url={picture.url}
                date={picture.date}
                location={picture.location}
              />
            </Link>
          ))}
      </section>
    </div>
  );
};

export default Home;

import { useRouter } from "next/router";
import { FC } from "react";
import { FaSpotify } from "react-icons/fa";
import PictureCard from "../../components/PictureCard";
import { picturesArray } from "../../data";

const Collection: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const pictures = picturesArray;

  return (
    <div className="bg-richBlack text-ghostWhite">
      <div className="p-4 flex justify-between">
        <h4>Collection Title</h4>
        <FaSpotify size={18} />
      </div>
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

export default Collection;

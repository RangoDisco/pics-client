import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import PictureCard from "../../components/Cards/Picture/PictureCard";
import { usePics } from "../../contexts/Pictures/PicturesProvider";

const Collection: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { collection, fetchCollectionById } = usePics();

  useEffect(() => {
    (async () => id && (await fetchCollectionById(+id)))();
  }, [fetchCollectionById, id]);

  useEffect(() => {
    console.log(collection);
  }, [collection]);

  return (
    <div className="bg-richBlack text-ghostWhite">
      {collection && (
        <>
          <div className="p-4 flex justify-between">
            <h4>{collection.title}</h4>
            <FaSpotify size={18} />
          </div>
          <section className="p-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {collection.pictures?.length > 0 &&
              collection.pictures.map((picture) => (
                <PictureCard
                  key={picture.id}
                  id={picture.id}
                  title={picture.title}
                  url={picture.contentUrl}
                  date={picture.date}
                  location={picture.location}
                />
              ))}
          </section>
        </>
      )}
    </div>
  );
};

export default Collection;

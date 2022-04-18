import { FC } from "react";
import CollectionCard from "../../components/CollectionCard";

const Collections: FC = () => {
  return (
    <section
      className="p-4 grid grid-cols-4 gap-6 bg-richBlack text-ghostWhite"
      style={{ minHeight: "94.1vh" }}
    >
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
    </section>
  );
};

export default Collections;

import { render, screen } from "@testing-library/react";
import CollectionCard from "../../src/components/Collection/Cards/CollectionCard";
import "@testing-library/jest-dom";
import { ICollection } from "../../src/contexts/Pictures/types";
import { IUser } from "../../src/contexts/Users/types";
import getISODate from "../../src/helpers/getIsoDate";
import SpotifyLogoLink from "../../src/components/SpotifyLogoLink";

describe("Collection card", () => {
  it("Renders the collection card", () => {
    const collection: ICollection = {
      id: 1,
      title: "Test collection",
      date: new Date(),
      description: "Description",
      author: {} as IUser,
      category: { id: 1, title: "Nature" },
      tags: [{ id: 1, title: "Printemps" }],
      musicLink: "spotify:track:6xGruZOHLs39ZbVccQTuPZ?si=0a958fab5d1c4e62",
      pictures: [
        {
          id: 1,
          contentUrl:
            "https://picnicstorage.fra1.digitaloceanspaces.com/f039b5f5-880b-42be-ac76-a98bf9c6ebb0.jpg",
          date: new Date(),
          location: "Lyon",
          creationDate: new Date(),
          isActive: true,
          author: {} as IUser,
        },
      ],
    };
    render(<CollectionCard {...collection} />);

    const titleElement = screen.getByRole("collection-title");
    expect(titleElement).toHaveTextContent("Test collection");

    const categoryElement = screen.getByRole("category");
    expect(categoryElement).toHaveTextContent(collection.category.title);

    const tagsElements = screen.getAllByRole("tag");
    expect(tagsElements.length).toEqual(collection.tags.length);
    expect(tagsElements[0]).toHaveTextContent(collection.tags[0].title);

    const dateElement = screen.getByRole("date");
    expect(dateElement).toHaveTextContent(getISODate(collection.date));

    const musicLinkElement = screen.getByRole("musicLink");
    expect(musicLinkElement).toBeInTheDocument();
  });
});

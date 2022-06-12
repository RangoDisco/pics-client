import { render, screen } from "@testing-library/react";
import PictureCard from "../../src/components/Pictures/Cards/PictureCard";
import "@testing-library/jest-dom";

describe("Picture card", () => {
  it("Renders the picture card", () => {
    render(
      <PictureCard
        id={1}
        url="https://picnicstorage.fra1.digitaloceanspaces.com/f039b5f5-880b-42be-ac76-a98bf9c6ebb0.jpg"
        date={new Date()}
        location="Lyon"
      />
    );

    const imageElement = screen.getByRole("image");
    expect(imageElement).toBeInTheDocument();

    const locationElement = screen.getByRole("location");
    expect(locationElement).toHaveTextContent("Lyon");

    const dateElement = screen.getByRole("date");
    expect(dateElement).toHaveTextContent(
      new Date().toISOString().split("T")[0]
    );
  });
});

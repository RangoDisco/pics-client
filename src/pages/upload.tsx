import Head from "next/head";
import { ChangeEvent, FC, useRef, useState } from "react";
import Select from "../components/Select";
import TextInput from "../components/TextInput";
import { ICollection } from "../contexts/Pictures/types";

const Upload: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>("");
  const [collection, setCollection] = useState<ICollection>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });
    formData.append(event.target.files[0].name, event.target.files[0]);
    console.log(event.target.files);
    console.log(formData);
  };

  return (
    <>
      <Head>
        <title>Pic-Nic Upload</title>
        <meta name="description" content="Page upload" />
      </Head>
      <section
        className="h-full bg-richBlack text-ghostWhite"
        style={{ minHeight: "94.1vh" }}
      >
        <form
          style={{ height: "94.1vh" }}
          className="h-full flex flex-col justify-center items-center bg-richBlack text-ghostWhite"
        >
          <div className="flex flex-col">
            <TextInput
              label="title"
              type="text"
              value={title}
              setValue={setTitle}
              required={true}
            />
          </div>
          <div className="flex flex-col mt-8">
            <TextInput
              label="location"
              type="location"
              value={location}
              setValue={setLocation}
              required={true}
            />
          </div>
          <div className="flex flex-col mt-8"></div>
          <div className="mt-8">
            <button type="button" onClick={handleFileInput}>
              Add picture
            </button>
            <input
              multiple={false}
              name="pictureFile"
              onChange={onChangeHandler}
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Upload;

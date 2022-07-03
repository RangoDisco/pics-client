import { ThreeBody } from "@uiball/loaders";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import TextInput from "../components/TextInput";
import { useAuth } from "../contexts/Auth/AuthProvider";
import { FETCHCOLLECTIONS } from "../contexts/Pictures/gql/queries";
import { usePics } from "../contexts/Pictures/PicturesProvider";
import { ICollection } from "../contexts/Pictures/types";
import { execQuery } from "../helpers/graphqlClient";
interface IProps {
  ssrCollections: ICollection[];
}
const Upload = ({ ssrCollections }: IProps) => {
  const [date, setDate] = useState<string>();
  const [location, setLocation] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [picture, setPicture] = useState<string>();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadPicture, createPicture, error, isLoading } = usePics();

  const { currentUser } = useAuth();
  const router = useRouter();

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };
  const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setPicture(undefined);
    if (!event.target.files?.length) {
      return;
    }
    const res = await uploadPicture(event.target.files[0]);
    setPicture(res?.data.uploadFile);
  };

  const handleSelectCollection = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(event.target.value);
  };

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (location && date && picture && selectedCollection) {
      const res = await createPicture({
        location,
        date,
        contentUrl: picture,
        collections: [+selectedCollection],
      });
      if (res) {
        router.push(`/collections/${selectedCollection}`);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role !== "Admin") {
        router.push("/");
      } else {
        setCollections(ssrCollections);
      }
    }
  }, [currentUser, router, ssrCollections]);

  useEffect(() => {
    setIsFormComplete(
      !!location && !!selectedCollection && !!picture && !!date
    );
  }, [location, selectedCollection, picture, date]);

  return (
    currentUser &&
    currentUser.role === "Admin" && (
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
            className="h-full flex flex-col justify-center items-center bg-silk dark:bg-richBlack text-richBlack dark:text-ghostWhite"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col mt-8 w-1/4">
              <div
                className="self-centered w-full h-64 bg-creme dark:bg-raisinBlack rounded-lg flex justify-center items-center cursor-pointer"
                onClick={handleFileInput}
                style={{
                  backgroundImage: picture && `url(${picture})`,
                  backgroundSize: "cover",
                }}
              >
                {!picture && !isLoading && "Add picture"}
                {isLoading && !picture && (
                  <div className="flex justify-center items-center">
                    <ThreeBody size={35} speed={1.1} color="white" />
                  </div>
                )}
              </div>
              <input
                multiple={false}
                name="pictureFile"
                onChange={onChangeHandler}
                ref={fileInputRef}
                style={{ display: "none" }}
                type="file"
                accept="image/jpg"
              />
            </div>
            <div className="flex flex-col mt-8 w-1/6">
              <TextInput
                label="location"
                type="location"
                value={location}
                setValue={setLocation}
                required={true}
              />
            </div>
            <div className="flex flex-col mt-8 w-1/6">
              <select
                defaultValue="default"
                onChange={handleSelectCollection}
                className="block py-2.5 w-full text-sm bg-silk dark:bg-richBlack border-0 border-b border-gray-200 focus:outline-none"
              >
                <option value="default"> Choose a collection</option>
                {collections.map((collection: ICollection, index: number) => (
                  <option value={collection.id} key={index}>
                    {collection.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mt-8 w-1/6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path>
                  </svg>
                </div>
                <input
                  type="date"
                  className="bg-silk dark:bg-richBlack border-b sm:text-sm w-full pl-10 p-2.5"
                  placeholder="Select date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mt-8 w-1/6 items-center">
              <button
                type="submit"
                className={`self-centered bg-rose dark:bg-munsellBlue w-full rounded-full p-2 mb-2 transition:colors duration-200 text-ghostWhite ${
                  !isFormComplete && "opacity-25"
                }`}
                disabled={!isFormComplete}
              >
                {isLoading && picture ? (
                  <div className="flex justify-center items-center">
                    <ThreeBody size={35} speed={1.1} color="white" />
                    <p className="self-center">Loading</p>
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
              {error && <p>{error}</p>}
            </div>
          </form>
        </section>
      </>
    )
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await execQuery(
      FETCHCOLLECTIONS,
      {
        first: 20,
        after: 0,
      },
      { req }
    );
    return {
      props: {
        ssrCollections: res.data.collectionsPage.collections,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }
};

export default Upload;

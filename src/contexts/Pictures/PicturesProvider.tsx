import { useLazyQuery, useMutation } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { CREATEPICTURE, UPLOADIMAGE } from "./gql/mutations";
import {
  FETCHCOLLECTIONBYID,
  FETCHCOLLECTIONS,
  FETCHPICTUREBYID,
  FETCHPICTURES,
  FETCHRANDOMPICTURE,
} from "./gql/queries";
import {
  ICollection,
  IPicture,
  IPictureInput,
  IPicturesContext,
} from "./types";

interface IProps {
  children: ReactNode;
}
const picturesContext = createContext<IPicturesContext>({} as IPicturesContext);

const PicturesProvider = (props: IProps) => {
  const [picture, setPicture] = useState<IPicture | null>(null);

  const [collection, setCollection] = useState<ICollection | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [execFindAll] = useLazyQuery(FETCHPICTURES);
  const [execFindOne] = useLazyQuery(FETCHPICTUREBYID);
  const [execFindCollections] = useLazyQuery(FETCHCOLLECTIONS);
  const [execFindCollectionById] = useLazyQuery(FETCHCOLLECTIONBYID);
  const [execFindRandom] = useLazyQuery(FETCHRANDOMPICTURE);
  const [doUploadPicture] = useMutation(UPLOADIMAGE);
  const [doCreatePicture] = useMutation(CREATEPICTURE);

  const fetchPictures = useCallback(
    async (first: number, after: number) => {
      setError("");
      setIsLoading(true);
      try {
        const res = await execFindAll({
          variables: { first, after },
        });
        return {
          pictures: res.data.picturesPage.pictures,
          picturesTotalCount: res.data.picturesPage.totalCount,
        };
      } catch (error) {
        setError("An error occurred: Unable to fetch pictures");
      } finally {
        setIsLoading(false);
      }
    },
    [execFindAll]
  );

  const fetchPictureById = useCallback(
    async (pictureId: number) => {
      setError("");
      setIsLoading(true);
      try {
        const res = await execFindOne({ variables: { id: pictureId } });
        setPicture(res.data.picture);
      } catch (error) {
        setError("An error occurred: Unable to fetch picture");
      } finally {
        setIsLoading(false);
      }
    },
    [execFindOne]
  );

  const fetchRandomPicture = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await execFindRandom();
      setPicture(res.data.pictureRandom);
    } catch (error) {
      setError("An error occurred: Unable to fetch picture");
    } finally {
      setIsLoading(false);
    }
  }, [execFindRandom]);

  const fetchCollections = useCallback(
    async (first: number, after: number) => {
      setError("");
      setIsLoading(true);
      try {
        const res = await execFindCollections({
          variables: { first, after },
        });
        return {
          collections: res.data.collectionsPage.collections,
          collectionsTotalCount: res.data.collectionsPage.totalCount,
        };
      } catch (error) {
        setError("An error occurred: Unable to fetch collections");
      } finally {
        setIsLoading(false);
      }
    },
    [execFindCollections]
  );

  const fetchCollectionById = useCallback(
    async (collectionId: number) => {
      setError("");
      setIsLoading(true);
      try {
        const res = await execFindCollectionById({
          variables: { id: collectionId },
        });
        setCollection(res.data.collection);
      } catch (error) {
        setError("An error occurred: Unable to fetch collections");
      } finally {
        setIsLoading(false);
      }
    },
    [execFindCollectionById]
  );

  const uploadPicture = async (file: any) => {
    try {
      setIsLoading(true);
      const res = await doUploadPicture({
        variables: {
          file,
        },
      });
      return res;
    } catch (error) {
      setError("Unable to upload picture");
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPicture = async (pictureBody: IPictureInput) => {
    try {
      setIsLoading(true);
      await doCreatePicture({
        variables: {
          createPictureInput: { ...pictureBody },
        },
      });
      return true;
    } catch (error) {
      setError("Unable to create picture");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: IPicturesContext = {
    picture,
    collection,
    isLoading,
    error,
    fetchPictures,
    fetchPictureById,
    fetchRandomPicture,
    fetchCollections,
    fetchCollectionById,
    uploadPicture,
    createPicture,
  };
  return (
    <picturesContext.Provider value={contextValue}>
      {props.children}
    </picturesContext.Provider>
  );
};

export function usePics() {
  return useContext(picturesContext);
}

export default PicturesProvider;

import { useLazyQuery, useQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  FETCHCOLLECTIONBYID,
  FETCHCOLLECTIONS,
  FETCHPICTUREBYID,
  FETCHPICTURES,
} from "./gql/queries";
import { ICollection, IPicture, IPicturesContext } from "./types";

interface IProps {
  children: ReactNode;
}
const picturesContext = createContext<IPicturesContext>({} as IPicturesContext);

const PicturesProvider = (props: IProps) => {
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [picture, setPicture] = useState<IPicture | null>(null);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collection, setCollection] = useState<ICollection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [execFindAll] = useLazyQuery(FETCHPICTURES);
  const [execFindOne] = useLazyQuery(FETCHPICTUREBYID);
  const [execFindCollections] = useLazyQuery(FETCHCOLLECTIONS);
  const [execFindCollectionById] = useLazyQuery(FETCHCOLLECTIONBYID);

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await execFindAll();
      setPictures(res.data.pictures);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [execFindAll]);

  const fetchPictureById = useCallback(
    async (pictureId: number) => {
      setIsLoading(true);
      try {
        const res = await execFindOne({ variables: { id: pictureId } });
        setPicture(res.data.picture);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [execFindOne]
  );

  const fetchCollections = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await execFindCollections();

      setCollections(res.data.collections);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [execFindCollections]);

  const fetchCollectionById = useCallback(
    async (collectionId: number) => {
      setIsLoading(true);
      try {
        const res = await execFindCollectionById({
          variables: { id: collectionId },
        });
        setCollection(res.data.collection);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [execFindCollectionById]
  );

  const contextValue: IPicturesContext = {
    pictures,
    picture,
    collections,
    collection,
    isLoading,
    fetchPictures,
    fetchPictureById,
    fetchCollections,
    fetchCollectionById,
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

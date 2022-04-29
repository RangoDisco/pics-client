import { useLazyQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FETCHCOLLECTIONBYID,
  FETCHCOLLECTIONS,
  FETCHPICTUREBYID,
  FETCHPICTURES,
  FETCHRANDOMPICTURE,
} from "./gql/queries";
import { ICollection, IPicture, IPicturesContext } from "./types";

interface IProps {
  children: ReactNode;
}
const picturesContext = createContext<IPicturesContext>({} as IPicturesContext);

const PicturesProvider = (props: IProps) => {
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [picturesTotalCount, setPicturesTotalCount] = useState(0);
  const [picture, setPicture] = useState<IPicture | null>(null);

  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collectionsTotalCount, setCollectionsTotalCount] = useState(0);
  const [collection, setCollection] = useState<ICollection | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [execFindAll] = useLazyQuery(FETCHPICTURES);
  const [execFindOne] = useLazyQuery(FETCHPICTUREBYID);
  const [execFindCollections] = useLazyQuery(FETCHCOLLECTIONS);
  const [execFindCollectionById] = useLazyQuery(FETCHCOLLECTIONBYID);
  const [execFindRandom] = useLazyQuery(FETCHRANDOMPICTURE);

  const fetchPictures = useCallback(
    async (first: number, after: number, exPics: IPicture[]) => {
      setIsLoading(true);
      try {
        const res = await execFindAll({
          variables: { first, after },
        });
        exPics.length > 0
          ? setPictures([...exPics, ...res.data.picturesPage.pictures])
          : setPictures(res.data.picturesPage.pictures);
        setPicturesTotalCount(res.data.picturesPage.totalCount);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [execFindAll]
  );

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

  const fetchRandomPicture = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await execFindRandom();
      setPicture(res.data.pictureRandom);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [execFindRandom]);

  const fetchCollections = useCallback(
    async (first: number, after: number, exColls: ICollection[]) => {
      setIsLoading(true);
      try {
        const res = await execFindCollections({
          variables: { first, after },
        });
        exColls.length > 0
          ? setCollections([
              ...exColls,
              ...res.data.collectionsPage.collections,
            ])
          : setCollections(res.data.collectionsPage.collections);
        setCollectionsTotalCount(res.data.collectionsPage.totalCount);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [execFindCollections]
  );

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
    picturesTotalCount,
    picture,
    collections,
    collectionsTotalCount,
    collection,
    isLoading,
    fetchPictures,
    fetchPictureById,
    fetchRandomPicture,
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

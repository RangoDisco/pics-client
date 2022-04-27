import { useLazyQuery, useQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { FETCHPICTUREBYID, FETCHPICTURES } from "./gql/queries";
import { IPicture, IPicturesContext } from "./types";

interface IProps {
  children: ReactNode;
}
const picturesContext = createContext<IPicturesContext>({} as IPicturesContext);

const PicturesProvider = (props: IProps) => {
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [picture, setPicture] = useState<IPicture | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [execFindAll] = useLazyQuery(FETCHPICTURES);
  const [execFindOne] = useLazyQuery(FETCHPICTUREBYID);

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

  const contextValue: IPicturesContext = {
    pictures,
    picture,
    isLoading,
    fetchPictures,
    fetchPictureById,
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

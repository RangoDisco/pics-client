import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { execQuery } from "../../../graphqlClient";
import {
  FETCHPICTUREBYID,
  FETCHRANDOMPICTURE,
} from "../../contexts/Pictures/gql/queries";
import { IPicture } from "../../contexts/Pictures/types";

interface IProps {
  picture: IPicture;
  error: any;
}

const FullPicture: FC<IProps> = ({ picture, error }: IProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error === "Error: No token") {
      router.push("/signin");
    }
  }, [error, router]);
  return (
    <>
      <Head>
        <title>Pic-Nic {picture?.title || "photo"}</title>
        <meta name="description" content="Page photo" />
      </Head>
      <section className="bg-richBlack h-screen">
        {error && (
          <h2 className="p-4 text-center text-red">
            {error && "An error occurred"}
          </h2>
        )}
        <div className="p-4 w-full h-full">
          <a href={`${picture.contentUrl}`} target="_blank" rel="noreferrer">
            <Image
              src={`${picture.contentUrl}`}
              alt="picture"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  try {
    if (Number(params?.id)) {
      const res = await execQuery(
        FETCHPICTUREBYID,
        { id: Number(params?.id) },
        { req }
      );
      return {
        props: {
          picture: res.data.picture,
        },
      };
    } else {
      const res = await execQuery(FETCHRANDOMPICTURE, null, { req });
      return {
        props: {
          picture: res.data.pictureRandom,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        error: String(error),
      },
    };
  }
};

export default FullPicture;

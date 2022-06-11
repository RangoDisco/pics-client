import { FC } from "react";

import { RiGithubFill, RiEarthFill } from "react-icons/ri";

const Footer: FC = () => {
  return (
    <div className="bg-creme dark:bg-raisinBlack text-richBlack dark:text-ghostWhite p-10 bottom-0 flex flex-col justify-center items-center z-50">
      <p>Absolument pas de copyright · {new Date().getUTCFullYear()}</p>
      <div className="flex flex-row justify-between mt-2">
        <a
          className="transition-all duration-200 hover:text-rose dark:hover:text-munsellBlue"
          href="https://github.com/RangoDisco"
          target="_blank"
          rel="noreferrer"
        >
          <RiGithubFill size={26} />
        </a>
        <a
          className="transition-all duration-200 hover:text-rose dark:hover:text-munsellBlue ml-4"
          href="https:maxime-dias.fr"
          target="_blank"
          rel="noreferrer"
        >
          <RiEarthFill size={26} />
        </a>
      </div>
    </div>
  );
};

export default Footer;

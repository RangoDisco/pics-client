import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="bg-raisinBlack text-ghostWhite p-10 bottom-0 flex flex-col justify-center items-center z-50">
      <p>Ouais ouais les photos ouais</p>
      <div className="flex flex-row">
        <a
          className="transition-all duration-200 hover:text-munsellBlue"
          href="https://github.com/RangoDisco"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        {"⋅"}
        <a
          className="transition-all duration-200 hover:text-munsellBlue"
          href="https:maxime-dias.fr"
          target="_blank"
          rel="noreferrer"
        >
          Site
        </a>
      </div>
    </div>
  );
};

export default Footer;

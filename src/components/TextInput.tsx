import { FC, Dispatch, SetStateAction } from "react";
interface IProps {
  label: string;
  type: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<string>>;
  required: boolean;
}
const TextInput: FC<IProps> = ({
  label,
  type,
  value,
  setValue,
  required,
}: IProps) => {
  return (
    <>
      <label htmlFor={label} className="self-start">
        {`${label.charAt(0).toUpperCase()}${label.slice(1)}`}
      </label>
      <input
        required={required}
        name={label}
        id={label}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt border-b bg-silk dark:bg-richBlack transition-color duration-200 border-richBlack dark:border-ghostWhite outline-none focus:border-b-rose dark:focus:border-b-munsellBlue outline:none"
      />
    </>
  );
};

export default TextInput;

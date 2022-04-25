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
      <label htmlFor={label} className="textMunsellBlue self-start">
        {`${label.charAt(0).toUpperCase()}${label.slice(1)}`}
      </label>
      <input
        required={required}
        name={label}
        id={label}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt shadow border-b bg-richBlack transition-color duration-200 border-ghostWhite outline-none focus:border-b-munsellBlue"
      />
    </>
  );
};

export default TextInput;

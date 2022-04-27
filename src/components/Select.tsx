import { Dispatch, FC, SetStateAction } from "react";
interface IProps {
  selectedValue: string;
  setSelectedvalue: Dispatch<SetStateAction<string>>;
  values: string[];
}
const Select: FC<IProps> = ({
  selectedValue,
  setSelectedvalue,
  values,
}: IProps) => {
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default Select;

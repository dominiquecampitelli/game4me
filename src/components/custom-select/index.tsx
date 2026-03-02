import Select from "react-select";
import type { StylesConfig } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};

type MultiProps = {
  isMulti: true;
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  placeholder?: string;
};

type SingleProps = {
  isMulti?: false;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
  placeholder?: string;
};

type Props = MultiProps | SingleProps;

const customStyles: StylesConfig<SelectOption, boolean> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#111",
    borderColor: state.isFocused ? "#ff00c8" : "#00f0ff",
    boxShadow: "none",
    borderRadius: "8px",
    padding: "4px",
    transition: "0.3s",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#111",
    border: "1px solid #00f0ff",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#1a1a1a" : "#111",
    color: "#fff",
    cursor: "pointer",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#777",
  }),
};

export default function CustomSelect(props: Props) {
  return (
    <Select
      {...props}
      styles={customStyles}
      onChange={(selected) => {
        if (props.isMulti) {
          props.onChange(selected as SelectOption[]);
        } else {
          props.onChange(selected as SelectOption | null);
        }
      }}
    />
  );
}

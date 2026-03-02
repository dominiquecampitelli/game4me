import "./styles.css";

type Props = {
  value: number | null;
  onChange: (value: number | null) => void;
};

export default function InputNumber({ value, onChange }: Props) {
  return (
    <input
      type="number"
      placeholder="Memória RAM (GB)"
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val ? Number(val) : null);
      }}
      className="ram-input"
      min={0}
    />
  );
}

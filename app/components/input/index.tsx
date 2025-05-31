export const CInput = ({
  type = "text",
  label,
  value,
  name,
  onChange,
}: {
  type?: string;
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2 focus:border-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};

export const CButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  isLoading = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={`bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

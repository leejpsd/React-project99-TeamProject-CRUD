const CustomButton = ({
  type = "button",
  className,
  width,
  height,
  margin,
  padding,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={{ width, height, padding, margin }}
    >
      {children}
    </button>
  );
};
export default CustomButton;

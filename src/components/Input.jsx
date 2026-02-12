import { dashboardInputClassName } from "./dashboardFieldClassNames";

const DashboardInput = ({
  label,
  id,
  className = "",
  containerClassName = "text-sm",
  ...props
}) => {
  const input = (
    <input
      id={id}
      className={`${dashboardInputClassName} ${className}`.trim()}
      {...props}
    />
  );

  if (label == null) {
    return input;
  }

  return (
    <label className={containerClassName} htmlFor={id}>
      {label}
      {input}
    </label>
  );
};

export default DashboardInput;

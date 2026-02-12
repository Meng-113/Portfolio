import { dashboardTextareaClassName } from "./dashboardFieldClassNames";

const DashboardTextarea = ({
  label,
  id,
  className = "",
  containerClassName = "block text-sm",
  ...props
}) => {
  const textarea = (
    <textarea
      id={id}
      className={`${dashboardTextareaClassName} ${className}`.trim()}
      {...props}
    />
  );

  if (label == null) {
    return textarea;
  }

  return (
    <label className={containerClassName} htmlFor={id}>
      {label}
      {textarea}
    </label>
  );
};

export default DashboardTextarea;

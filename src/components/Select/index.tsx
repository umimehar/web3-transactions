import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<"select"> {
  options: { label: string; value: string | number }[];
  label?: string;
  selectClassName?: ComponentProps<"div">["className"];
}
export const Select = ({
  options,
  label,
  selectClassName,
  ...rest
}: SelectProps) => {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}

      <select
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${selectClassName}`}
        {...rest}
      >
        {options &&
          options.map(({ label, value, ...rest }) => (
            <option key={value} value={value} {...rest}>
              {label}
            </option>
          ))}
      </select>
    </div>
  );
};

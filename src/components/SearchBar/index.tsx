import { ComponentProps, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { isValidAddress } from "@/utils/is-valid-address";

type Input = {
  address: string;
};

interface SearchBarProps {
  onSubmit: (data: Input) => void;
  defaultValue?: string;
}
export const SearchBar = ({ onSubmit, defaultValue }: SearchBarProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Input>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit && onSubmit(data);
      })}
      className={"w-full"}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          defaultValue={defaultValue}
          type="search"
          id="default-search"
          className="block w-full font-medium p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          {...register("address", {
            required: true,
            minLength: 42,
            maxLength: 42,
            validate: (value) => isValidAddress(value),
          })}
        />
        <button
          type="submit"
          className={twMerge(
            "absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 ",
            isValid &&
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            !isValid && "bg-gray-300 text-gray-500 cursor-not-allowed",
          )}
          disabled={!isValid}
        >
          Search
        </button>
      </div>
      <div className="mt-1 text-sm text-black dark:text-red-400">
        {errors.address && errors.address.type === "required"
          ? "Address is required."
          : errors.address && "Address is invalid."}
      </div>
    </form>
  );
};

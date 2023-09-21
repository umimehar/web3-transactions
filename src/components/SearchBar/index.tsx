import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { isValidAddress } from "@/utils/util-funcs";
import { ChainIds } from "@/utils/chains";

type Input = {
  address: string;
};

interface SearchBarProps {
  onSubmit: (data: Input) => Promise<void>;
  defaultValue?: string;
  chainId?: number;
}
export const SearchBar = ({
  onSubmit,
  defaultValue,
  chainId,
}: SearchBarProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Input>();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        onSubmit && (await onSubmit(data));
        reset();
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
          className="block w-full text-sm md:text-md font-medium p-4 pl-8 md:pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            "absolute right-2.5 bottom-3 md:bottom-2.5 font-medium rounded-lg text-sm px-2 py-1 md:px-4 md:py-2 ",
            "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            // !isValid && "bg-gray-300 text-gray-500 cursor-not-allowed",
          )}
          // disabled={!isValid}
        >
          Search
        </button>
      </div>
      <div className="mt-1 text-sm text-black h-6 font-bold">
        {errors.address ? (
          <div className={"dark:text-red-400 text-red-600"}>
            {errors.address.type === "required"
              ? "Address is required."
              : errors.address && "Address is invalid."}
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-900 dark:text-gray-400 w-full">
              {chainId === ChainIds.POLYGON
                ? "Use 0x0b186dbb33b6e36107c5ef4f595ee16076e8618d on Polygon."
                : "Use 0xe8bdcdc4c8c05245a68410351293cda30980ab49 on Ethereum."}
            </div>
          </>
        )}
      </div>
    </form>
  );
};

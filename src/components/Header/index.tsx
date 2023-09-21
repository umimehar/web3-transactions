import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const Header = () => {
  const { resolvedTheme: theme, setTheme, systemTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            className="mr-2"
            alt="Logo"
            width={45}
            height={45}
          />
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Web3 Transactions
          </span>
        </Link>
        {loaded && (
          <button
            className="mr-2 w-10 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {theme === "dark" && <SunIcon fontSize={"24px"} />}
            {theme === "light" && <MoonIcon fontSize={"224px"} />}
          </button>
        )}
      </div>
    </nav>
  );
};

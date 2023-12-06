"use client";

import axios, { AxiosError } from "axios";
import { Moon, Sun, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// const THEMES = ["light", "dark"];

interface Props {
  username: string
}

export const Navbar:React.FC<Props> = ({ username }) => {
  // const [theme, setTheme] = React.useState("light");
  const { push } = useRouter()

  // React.useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  // const handleThemeChange = (e: any) => {
  //   const val = e.target.getAttribute("data-set-theme");
  //   setTheme(val);
  // };

  async function handleSignOut() {
    try {
      const { data } = await axios.get('/api/auth/logout')
      console.log(data)
      push("/")
      alert(data.message)
      return data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }

  return (
    <header className="bg-base-100 py-2 sticky top-0 z-50">
      <div className="container">
        <div className="navbar px-0">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-square btn-ghost lg:hidden mr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                {/* <i className="bi bi-list text-2xl"></i> */}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-1 w-52 menu menu-compact p-2 bg-base-200 shadow rounded-box"
              >
                <li>
                  <a href="#!">Home</a>
                </li>
                <li>
                  <a href="#!">Services</a>
                </li>
              </ul>
            </div>
            <a href="/app" className="font-bold text-2xl cursor-pointer">Jet-Set-Go</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 font-medium">
              <li>
                <a href="/app">Home</a>
              </li>
              <li>
                <a href="/app/search">Plan Trip</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">{username}<User /></div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li><a href="/app/recommendations">My Recommendations</a></li>
                <li><a href="/app/profile">Profile</a></li>
                <li><button onClick={handleSignOut}>Sign Out</button></li>
              </ul>
            </div>
            {/* <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                {theme == "light" ? <Sun></Sun> : <Moon></Moon>}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-1 w-32 max-h-96 overflow-y-auto menu menu-compact p-2  bg-base-200 shadow rounded-md"
              >
                {THEMES.map((theme, i) => (
                  <li key={theme + i}>
                    <button
                      data-set-theme={theme}
                      onClick={handleThemeChange}
                      className="font-medium capitalize"
                    >
                      {theme}
                    </button>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

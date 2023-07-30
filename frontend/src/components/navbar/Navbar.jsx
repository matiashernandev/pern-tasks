import { Link, useLocation } from "react-router-dom"
import { publicRoutes, privateRoutes } from "./navigation"
import { Container } from "../ui"
import { useAuth } from "../../context/useAuth"
import { twMerge } from "tailwind-merge"
import { BiLogOut } from "react-icons/bi"

export default function Navbar() {
  const location = useLocation()
  const { isAuth, signout, user } = useAuth()

  return (
    <nav className="bg-zinc-950 ">
      <Container className="flex justify-between py-3 ">
        <Link to="/">
          <h1 className="font-bold text-2xl">PERN STACK</h1>
        </Link>
        <ul className="flex items-center justify-center md:gap-x-2">
          {isAuth ? (
            <>
              {privateRoutes.map(({ path, name, icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={twMerge(
                      "text-slate-300 flex items-center px-3 py-1 gap-x-1",
                      location.pathname === path && "bg-sky-500"
                    )}
                  >
                    {icon}

                    <span className="hidden sm:block">{name}</span>
                  </Link>
                </li>
              ))}

              <li
                className="text-slate-300 flex gap-x-1 items-center px-3 py-1 cursor-pointer hover:text-red-500"
                onClick={() => {
                  signout()
                }}
              >
                <BiLogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </li>

              <li className="flex items-center justify-center gap-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.gravatar}
                  alt=""
                />
                <span className="font-medium">{user.name}</span>
              </li>
            </>
          ) : (
            publicRoutes.map(({ path, name }) => (
              <li
                className={twMerge(
                  "text-slate-300 flex items-center px-3 py-1",
                  location.pathname === path && "bg-sky-500"
                )}
                key={path}
              >
                <Link to={path}> {name} </Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  )
}

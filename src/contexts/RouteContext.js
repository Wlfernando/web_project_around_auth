import { createContext } from "react";

export const RouteContext = createContext()

export const routeDev = {
  main: '/',
  register: '/signup',
  login: '/signin',
}
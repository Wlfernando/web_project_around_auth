import { createContext } from "react";

export const RouteContext = createContext()

const main = '/web_project_around_auth';

const register = main + '/signup';

const login = main + '/signin';

export const routeDev = {
  main,
  register,
  login,
}
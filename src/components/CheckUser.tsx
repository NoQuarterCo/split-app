import React, { FC, Fragment } from "react"

import { useAppState, useRoute } from "../lib/hooks/useAppContext"
import Login from "../screens/Login"
import Register from "../screens/Register"

function renderAuthRoutes(route: string) {
  switch (route) {
    case "LOGIN":
      return <Login />
    case "REGISTER":
      return <Register />
    default:
      return <Login />
  }
}

const CheckUser: FC = ({ children }) => {
  const { user } = useAppState()
  const { route } = useRoute()

  return user ? <Fragment>{children}</Fragment> : renderAuthRoutes(route)
}

export default CheckUser

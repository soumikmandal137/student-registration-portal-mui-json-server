import { createBrowserRouter } from "react-router-dom"
import Wrapper from "../component/Wrapper"
import Studentadd from "../page/admin/Studentadd"
import Studentlist from "../page/admin/Studentlist"
import Home from "../page/admin/Home"
import  Login  from "../page/Login"
import SignUp from "../page/Signup"
import Settings from "../page/admin/Settings"


const Route = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
 {
    path: "/admin",
    element: <Wrapper/>,
    children: [
      {
        path: "list",
        element: <Studentlist/>,
      },
      {
        path: "add",
        element: <Studentadd />,
      },
      {
        path: "edit/:id",
        element: <Studentadd/>,
      },
      {
        path: "settings",
        element:<Settings/>
      },
    ],
  },


])
export default Route;
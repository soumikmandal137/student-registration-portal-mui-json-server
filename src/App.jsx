// import Navbar from "./component/Navbar"

import { CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./theme/Theme"
import { RouterProvider } from "react-router-dom"
import Route from "./route/Routes"


function App() {
  

  return (
    <>
     {/* <Navbar/> */}

  <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={Route}/>
    </ThemeProvider>

    </>
  )
}

export default App

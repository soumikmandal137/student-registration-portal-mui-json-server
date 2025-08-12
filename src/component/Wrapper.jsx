import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate,  } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = () => {

    const navigate = useNavigate()
  const loginData = JSON.parse(localStorage.getItem("loginData"))
  useEffect(()=>{
      if(!loginData){
        navigate("/login")
      }
  },[loginData])

  return (
    <>
     <Box sx={{ display: "flex", height: "130vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: "300px", bgcolor: "#f4f4f4" }}>
        <Sidebar />
      </Box>

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default Wrapper
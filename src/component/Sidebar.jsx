import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/list">
            <ListItemText primary="Student List" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/add">
            <ListItemText primary="Student Add" />
          </ListItemButton>
        </ListItem>

 <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/settings">
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );
};

export default Sidebar;

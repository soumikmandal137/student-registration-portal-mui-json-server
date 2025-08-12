import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { RemoveRedEye } from "@mui/icons-material";

const Studentlist = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [studentList, setstudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteid, setDeleteid] = useState(null);
  const [openviewDialog, setOpenviewDialog] = useState(false);
  const [viewDetails, setViewDetails] = useState({});

  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/students");
      setstudentList(response?.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert(error.message);
      setstudentList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handledelete = async () => {
    if (deleteid) {
      try {
        await API.delete(`/students/${deleteid}`);
        setstudentList((prev) =>
          prev.filter((student) => student.id !== deleteid)
        );
      } catch (error) {
        console.log("student delete error", error);
      }
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  console.log("view details", viewDetails);
  

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Student List
      </Typography>

      {!isLoading ? (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Image</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {studentList?.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>{value.id}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.email}</TableCell>
                  <TableCell>{value.phone}</TableCell>
                  <TableCell>
                    {value.image && (
                      <img
                        src={value.image}
                        alt={value.name}
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/admin/edit/${value.id}`)}>
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenDialog(true);
                        setDeleteid(value.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>

                    <Button
                      onClick={() => {
                        setOpenviewDialog(true);
                        setViewDetails(value);
                      }}
                    >
                      <RemoveRedEye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      <Dialog
        open={openviewDialog}
        onClose={() => setOpenviewDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Student Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
            Name: {viewDetails?.name}
</Typography>
            Email:{viewDetails?.email}
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handledelete();
              handleCloseDialog();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Studentlist;

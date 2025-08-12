import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormGroup,
  Checkbox,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // Make sure you have this
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  description: yup.string(),
  category: yup.string().required("Category is required"),
  gender: yup.string().required("Gender is required"),
});

const categories = [
  { id: "School", name: "School" },
  { id: "College", name: "College" },
  { id: "Professional", name: "Professional" },
];

const Studentadd = () => {
  useEffect(() => {
    const fetchIdData = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/students/${id}`);
        // console.log(response);
        setEditData(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdData();
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      category: "",
      gender: "",
      hobby: "",
      programminglanguage: "",
    },
  });

  const onSubmitdata = (data) => {
    console.log({ ...data, photo });
    reset();
  };

  const handleCheckboxChange = (event, fieldName) => {
    const currentValues = watch(fieldName) || [];
    if (event.target.checked) {
      setValue(fieldName, [...currentValues, event.target.name]);
    } else {
      setValue(
        fieldName,
        currentValues.filter((val) => val !== event.target.name)
      );
    }
  };

  useEffect(() => {
    if (id) {
      const fetchIdData = async () => {
        setLoading(true);
        try {
          const response = await API.get(`/students/${id}`);
          setEditData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchIdData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      API.get(`/students/${id}`)
        .then((res) => {
          setEditData(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to fetch student data");
        });
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await API.put(`/students/${id}`, data);
        alert("Student updated successfully");
      } else {
        await API.post("/students", data);
        alert("Student added successfully");
      }
      reset();
      navigate("/admin/list");
    } catch (error) {
      console.error(error);
      alert("Error saving student");
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).forEach((key) => {
        // console.log(key, editData[key]);
        setValue(key, editData[key]);
      });
    }
  }, [editData, setValue]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Student Add
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
        <Box sx={{ width: "49%" }}>
          <TextField
            label="Phone"
            fullWidth
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Box>
        <Box>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row {...register("gender")}>
            <FormControlLabel
              value="female"
              control={<Radio {...register("gender")} />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio {...register("gender")} />}
              label="Male"
            />
            <FormControlLabel
              value="other"
              control={<Radio {...register("gender")} />}
              label="Other"
            />
          </RadioGroup>
          {errors.gender && (
            <Typography color="error">{errors.gender.message}</Typography>
          )}
        </Box>
      </Box>

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        {...register("description")}
      />

      <Box sx={{ display: "flex", gap: 4 }}>
        <Box sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select fullWidth {...register("category")} defaultValue="">
            <MenuItem value="">-- Select Category --</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <Typography color="error">{errors.category.message}</Typography>
          )}
        </Box>

        <Box>
          <FormLabel>Hobby</FormLabel>
          <FormGroup row>
            {["Reading", "Travelling", "Sports", "Music"].map((hobby) => (
              <FormControlLabel
                key={hobby}
                control={
                  <Checkbox
                    name={hobby}
                    onChange={(e) => handleCheckboxChange(e, "hobby")}
                  />
                }
                label={hobby}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <FormLabel>Programming Language</FormLabel>
        <FormGroup row>
          {["Javascript", "Python", "C++", "Java"].map((lang) => (
            <FormControlLabel
              key={lang}
              control={
                <Checkbox
                  name={lang}
                  onChange={(e) =>
                    handleCheckboxChange(e, "programminglanguage")
                  }
                />
              }
              label={lang}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
        <Avatar
          src={photoURL}
          alt="Student"
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Button component="label" variant="outlined">
          Upload Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Button>
      </Box>

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
        {id ? "UPDATE" : "SAVE"}
      </Button>
    </Box>
  );
};

export default Studentadd;

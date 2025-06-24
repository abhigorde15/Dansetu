import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Box, MenuItem, Select } from "@mui/material";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  "& .MuiDialog-paper": {
    minWidth: "600px",
    maxWidth: "90vw",
    padding: theme.spacing(3),
  },
}));

export default function CustomizedDialogs({ open, handleClose }) {
  const [shopData, setShopData] = React.useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    openingHours: "",
    categories: "",
    image: null, // File here
    description: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    
    setShopData({ ...shopData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", shopData.image); 
    formData.append("shopName", shopData.shopName);
    formData.append("ownerName", shopData.ownerName);
    formData.append("email", shopData.email);
    formData.append("phone", shopData.phone);
    formData.append("address", shopData.address);
    formData.append("openingHours", shopData.openingHours);
    formData.append("categories", shopData.categories);
    formData.append("description", shopData.description);
    formData.append("token", token); // Token सुद्धा पाठवा

    try {
      const response = await axios.post(
        "http://localhost:8080/api/shop/add",
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("shopId", response.data.shopId);
       
     
      handleClose();
    } catch (error) {
      console.error("Error submitting shop data:", error);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>List Your Shop</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Shop Name"
              name="shopName"
              fullWidth
              value={shopData.shopName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Owner Name"
              name="ownerName"
              fullWidth
              value={shopData.ownerName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={shopData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              value={shopData.phone}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address"
              name="address"
              fullWidth
              multiline
              rows={2}
              value={shopData.address}
              onChange={handleChange}
              required
            />
            <TextField
              label="Opening Hours (e.g., 9 AM - 9 PM)"
              name="openingHours"
              fullWidth
              value={shopData.openingHours}
              onChange={handleChange}
              required
            />
            <Select
              name="categories"
              value={shopData.categories}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Medical">Medical</MenuItem>
              <MenuItem value="Clothes">Clothes</MenuItem>
            </Select>
            <input
              type="file"
              accept="image"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
            <TextField
              label="Short Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={shopData.description}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

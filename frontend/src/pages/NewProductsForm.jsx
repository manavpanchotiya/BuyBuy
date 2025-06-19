import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { backendURL } from "../api";

function NewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_in_cents: "",
    image: "",
    category_id: "",
    quantity: 1,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${backendURL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked", formData);

    if (
      !formData.name.trim() ||
      !formData.price_in_cents ||
      !formData.category_id ||
      formData.quantity === "" || 
      formData.quantity < 0
    ) {
      alert("Please fill in all required fields and valid quantity.");
      return;
    }

    const payload = {
      ...formData,
      price_in_cents: parseInt(formData.price_in_cents, 10),
      category_id: parseInt(formData.category_id, 10),
      quantity: parseInt(formData.quantity, 10),
    };

    if (isNaN(payload.price_in_cents) || payload.price_in_cents < 0) {
      alert("Please enter a valid positive price.");
      return;
    }

    if (isNaN(payload.quantity) || payload.quantity < 0) {
      alert("Please enter a valid non-negative quantity.");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");
    fetch(`${backendURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) throw new Error("Failed to create product");
        return res.json();
      })
      .then(() => {
        alert("Product created successfully!");
        navigate("/seller");
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err);
        alert("Error creating product");
      });
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      my={3}
      p={2}
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4" component="h1" textAlign="center" mb={2}>
        Add New Product
      </Typography>

      <TextField
        label="Name *"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        autoFocus
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
      />

      <TextField
        label="Price in cents *"
        name="price_in_cents"
        type="number"
        inputProps={{ min: 0 }}
        value={formData.price_in_cents}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Quantity *"
        name="quantity"
        type="number"
        inputProps={{ min: 0 }}
        value={formData.quantity}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        fullWidth
      />

      <FormControl fullWidth required>
        <InputLabel id="category-label">Category *</InputLabel>
        <Select
          labelId="category-label"
          name="category_id"
          value={formData.category_id}
          label="Category *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Select category</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ py: 1.5 }}
      >
        {loading ? "Creating..." : "Create Product"}
      </Button>
    </Box>
  );
}

export default NewProduct;

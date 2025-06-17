import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Stack,
  Divider,
} from "@mui/material";

export default function AdminDashboard({ user }) {
  if (!user || !user.admin) {
    return <Navigate to="/login" replace />;
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (productId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setProducts((prev) => prev.filter((p) => p.id !== productId));

    fetch(`http://localhost:3000/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).catch(() => {
      alert("Failed to delete product");
      // Optional: revert UI change here
    });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={56} thickness={4.5} />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
        <Alert severity="error" variant="outlined" sx={{ fontWeight: 600 }}>
          {error}
        </Alert>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Stack spacing={1} mb={3}>
        <Typography variant="h3" fontWeight={700} color="primary.dark">
          Hello {user.first_name}!
        </Typography>
        
        <Divider sx={{ mt: 1 }} />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={4} mb={4}>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h5" fontWeight={700} color="text.primary">
            {products.length}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Current Listings
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h5" fontWeight={700} color="text.primary">
            5
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Categories
          </Typography>
        </Paper>
      </Stack>

      {products.length === 0 ? (
        <Typography variant="h6" color="text.secondary" textAlign="center" mt={8}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    transform: "translateY(-5px)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    height: 180,
                    width: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    backgroundColor: '#f5f5f5',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    noWrap
                    title={product.name}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={700}>
                    ${(product.price_in_cents / 100).toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(product.id)}
                    fullWidth
                    sx={{
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "error.light", color: "white" },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/seller", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Please log in to view your products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching seller products");
        setLoading(false);
      });
  }, []);

  const handleMarkSoldOut = (productId) => {
    if (!window.confirm("Mark this item as sold out?")) return;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: 0 } : product
      )
    );
  };

  const handleDelete = (productId) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  const token = localStorage.getItem("token");

  fetch(`http://localhost:3000/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete product");
      // Remove product from state
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    })
    .catch((err) => {
      alert("Error deleting product: " + err.message);
    });
};


  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  if (products.length === 0)
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          You don't have any listed products.
        </Typography>
        <Button
          component={Link}
          to="/seller/new"
          variant="contained"
          color="primary"
        >
          Add New Item
        </Button>
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">My Listings</Typography>
        <Button component={Link} to="/seller/new" variant="contained" color="primary">
          Sell on BuyBuy
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ 
                  height: 180,
                  width: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  backgroundColor: '#f5f5f5'
                }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">
                  Price: ${(product.price_in_cents / 100).toFixed(2)}
                </Typography>
                {product.quantity === 0 ? (
                  <Typography color="error" sx={{ mt: 1, fontWeight: "bold" }}>
                    Sold Out
                  </Typography>
                ) : null}
              </CardContent>
              <CardActions>
                {product.quantity > 0 && (
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => handleMarkSoldOut(product.id)}
                  >
                    Mark as Sold Out
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SellerProducts;

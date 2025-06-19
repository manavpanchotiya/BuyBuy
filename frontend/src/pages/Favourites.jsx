import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../api";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${backendURL}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFavourites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favourites:", err);
        setLoading(false);
      });
  }, [token]);

  // Handler to remove favourite
  const handleRemove = (productId, e) => {
    e.stopPropagation(); // prevent card click navigation
    fetch(`${backendURL}/favourites/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove favourite");
        setFavourites((prev) => prev.filter((p) => p.id !== productId));
      })
      .catch((err) => {
        console.error("Error removing favourite:", err);
      });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (favourites.length === 0)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        You have no favourites yet.
      </Typography>
    );

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 5 }}>
      <Typography variant="h4" fontWeight="600" gutterBottom>
        Your Favourites
      </Typography>

      <Grid container spacing={4}>
        {favourites.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  height: 180,
                  width: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  backgroundColor: "#f5f5f5",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="600" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description || "No description"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  ${(product.price_in_cents / 100).toFixed(2)}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={(e) => handleRemove(product.id, e)}
                >
                  Remove from Favourites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import { backendURL } from "../api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarPhotos, setSimilarPhotos] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch product details
  useEffect(() => {
    setLoading(true);
    fetch(`${backendURL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error!");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [id]);

  // Fetch similar products
  useEffect(() => {
    if (!product) return;

    fetch(`${backendURL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) =>
            p.id !== product.id &&
            (p.category === product.category ||
              p.location === product.location ||
              p.user?.id === product.user?.id)
        );
        setSimilarPhotos(filtered.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, [product]);

  // Check if product is favorited
  useEffect(() => {
    if (!token || !product) return;

    fetch(`${backendURL}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((favourites) => {
        setIsFavorited(favourites.some((fav) => fav.id === product.id));
      })
      .catch(console.error);
  }, [product, token]);

  // Toggle favorite state handler
  const toggleFavorite = () => {
    if (!token) {
      alert("Please login to save favorites");
      return;
    }

    setFavLoading(true);

    if (!isFavorited) {
      // Add to favorites
      fetch(`${backendURL}/favourites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to add favorite");
          setIsFavorited(true);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to add favorite");
        })
        .finally(() => setFavLoading(false));
    } else {
      // Remove from favorites
      fetch(`${backendURL}/favourites/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to remove favorite");
          setIsFavorited(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to remove favorite");
        })
        .finally(() => setFavLoading(false));
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (!product)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Product not found!
      </Typography>
    );

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 5 }}>
      {/* Product details */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardMedia
              component="img"
              height="350"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Quantity:</strong> {product.quantity} items in stock
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Seller:</strong> {product.user?.first_name}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              Price: ${(product.price_in_cents / 100).toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant={isFavorited ? "contained" : "outlined"}
              color="error"
              startIcon={<FavoriteIcon />}
              sx={{ flex: 1 }}
              onClick={toggleFavorite}
              disabled={favLoading}
            >
              {isFavorited ? "Saved" : "Save"}
            </Button>

            <Button
              variant="contained"
              startIcon={<MessageIcon />}
              component={Link}
              to={`/chats/${product.user?.id}`}
              sx={{ flex: 1 }}
            >
              Message Seller
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 5 }} />

      {/* Similar Products */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 5, px:2}}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Similar Products by Location, Category, or the same Seller
        </Typography>
        <Grid container spacing={3}>
          {similarPhotos.map((photo) => (
            <Grid key={photo.id} item xs={12} sm={6} md={3}>
              <Card
                component={Link}
                to={`/product/${photo.id}`}
                sx={{ textDecoration: "none", height: "100%", display:"flex", flexDirection: "column", justifyContent:"space-between" }}
              >
                <CardMedia
                  component="img"
                  image={photo.image}
                  alt={photo.name}
                  sx={{ 
                    height: 180,
                    width: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    backgroundColor: '#f5f5f5'
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="600" noWrap>
                    {photo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {photo.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {photo.quantity} item{photo.quantity > 1 ? "s" : ""} left
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="600">
                    ${(photo.price_in_cents / 100).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

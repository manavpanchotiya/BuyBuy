import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Product() {
  const {
    searchTerm,
    category,
    searchSubmitted,
    setSearchSubmitted,
    showSwappableOnly,
  } = useOutletContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const endpoint = showSwappableOnly
      ? 'http://localhost:3000/products?swappable=true'
      : 'http://localhost:3000/products';

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [showSwappableOnly]);

  const filtered = products.filter((product) => {
    const searchMatch =
      product.user?.first_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.user?.user_location
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const categoryMatch =
      !category || category === '' || product.category?.name === category;

    return searchTerm ? searchMatch && categoryMatch : categoryMatch;
  });

  useEffect(() => {
    if (!loading && searchSubmitted) {
      if (filtered.length === 0) {
        setFlashMessage(
          `No product found for "${searchTerm || 'your search'}"${
            category ? ` in category "${category}"` : ''
          }. Please try again.`
        );
        setShowFlash(true);
      } else {
        setFlashMessage('');
        setShowFlash(false);
      }
    }
  }, [filtered.length, searchSubmitted, searchTerm, category, loading]);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      {showFlash && (
        <Alert
          severity="warning"
          action={
            <IconButton
              onClick={() => {
                setFlashMessage('');
                setShowFlash(false);
                setSearchSubmitted(false);
              }}
              size="small"
              color="inherit"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {flashMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {filtered.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              component={Link}
              to={`/product/${product.id}`}
              sx={{
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
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
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 1,
                  }}
                >
                  {product.description}
                </Typography>

                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {product.quantity} item{product.quantity > 1 ? 's' : ''} left
                </Typography>

                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Sold by: {product.user?.first_name}
                </Typography>

                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Available in: {product.user?.user_location || 'Unknown'}
                </Typography>

                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  ${(product.price_in_cents / 100).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

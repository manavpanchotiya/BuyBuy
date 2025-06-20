import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CardMedia,
  Alert,
  IconButton,
  CircularProgress,
  Stack, Tooltip,
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
    const term = searchTerm.toLowerCase().trim();
    const nameMatch =
      product.name?.toLowerCase().includes(term);
    const sellerMatch =
      product.user?.first_name
        ?.toLowerCase()
        .includes(term);
    const locationMatch =
      product.user?.location
        ?.toLowerCase()
        .includes(term);
  
    const searchMatch =
      nameMatch || sellerMatch || locationMatch;
  
    const categoryMatch =
      !category || product.category?.name === category;
  
    return term ? searchMatch && categoryMatch : categoryMatch;
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress size={56} thickness={4.5} />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: 3 }}>
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
          sx={{ mb: 3, fontWeight: 600 }}
          variant="outlined"
        >
          {flashMessage}
        </Alert>
      )}

      <Grid container spacing={4} alignItems="stretch" justifyContent="center">
        {filtered.map((product) => (
            <Grid
          item
          key={product.id}
          sx={{
            flexBasis: {
              md: '16.66%',
              sm: '50%',     
              xs: '100%',    
            },
            maxWidth: {
              md: '16.66%',
              sm: '50%',
              xs: '100%',
            },
            display: 'flex',
          }}
        >

            <Paper
              component={Link}
              to={`/product/${product.id}`}
              elevation={6}
              sx={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow:
                  '0px 2px 6px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.06)',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow:
                    '0px 8px 20px rgba(0, 0, 0, 0.12), 0px 4px 10px rgba(0, 0, 0, 0.08)',
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
                    objectFit: 'cover',
                    objectPosition: 'center',
                    backgroundColor: '#f5f5f5',
                  }}
              />
              <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={product.name}
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

                <Stack spacing={0.5} mt={1}>
                  <Typography variant="body2" color="text.primary">
                    Quantity: {product.quantity}
                  </Typography>
                  
                  <Typography variant="body2" color="text.primary">
                    Seller's Location: {product.user?.location}
                  </Typography>

                  <Typography variant="body2" color="text.primary">
                    Sold by: {product.user?.first_name}
                  </Typography>
           
                </Stack>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="primary.main"
                  mt={2}
                  sx={{ letterSpacing: '0.03em' }}
                >
                  ${(product.price_in_cents / 100).toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

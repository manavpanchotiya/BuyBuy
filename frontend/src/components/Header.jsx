import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar,  Toolbar, Box, Typography, Button, InputBase, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, IconButton,} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BuyBuyLogo from '../components/BuyBuyLogo';

export default function Header({
  user,
  onLogout,
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  onSubmitClick,
  showSwappableOnly,
  onSwappableChange,
}) {
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={1} 
      sx={{ mb: 3, border: '1px solid', borderColor: 'grey.300', zIndex: (theme) => theme.zIndex.appBar + 1, }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          px: { xs: 1, sm: 3 },
          
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          
          <BuyBuyLogo />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {/* <Button component={RouterLink} to="/" color="inherit" size="small">Home</Button> */}
            <Button component={RouterLink} to="/products" color="inherit" size="small">| Home | </Button>
            <Button component={RouterLink} to="/seller" color="inherit" size="small">| My Products |</Button>
            {user ? (
              <>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  | Welcome, {user.first_name} |
                </Typography>
                <Button onClick={onLogout} color="inherit" size="small">| Logout |</Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/login" color="inherit" size="small">| Login |</Button>
                <Button component={RouterLink} to="/signup" color="inherit" size="small">| Sign Up |</Button>
              </>
            )}
            <Button component={RouterLink} to="/admin" color="inherit" size="small">| Admin |</Button>
            <IconButton component={RouterLink} to="/favourites" color="inherit" size="small" aria-label="favourites">
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', flexGrow: 1, maxWidth: 600 }}>
          <InputBase
            placeholder="Search by Product, seller or location"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            startAdornment={<SearchIcon sx={{ mr: 1, color: 'grey.600' }} />}
            sx={{
              flexGrow: 1,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              px: 1,
              py: 0.5,
            }}
          />

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Category"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Automobiles">Automobiles</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Fashion & Beauty">Fashion & Beauty</MenuItem>
              <MenuItem value="Home & Garden">Home & Garden</MenuItem>
              <MenuItem value="Toys">Toys</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={onSubmitClick} sx={{ whiteSpace: 'nowrap' }}>
            Search
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={showSwappableOnly}
                onChange={(e) => onSwappableChange(e.target.checked)}
                color="primary"
              />
            }
            label="Swappable only"
            sx={{ ml: 1 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

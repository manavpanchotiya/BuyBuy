import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BuyBuyLogo() {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1.8rem',
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        color: '#1976d2',
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      <Typography component="span" sx={{ color: '#1976d2' }}>
        Buy
      </Typography>
      <Typography
        component="span"
        sx={{
          color: '#ff5722',
          ml: 0.5,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        BUY
      </Typography>
    </Box>
  );
}

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BuyBuyLogo() {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      <Typography
        component="span"
        sx={{
          color: '#1976d2',
          fontSize: '1.8rem',
          // fontWeight: 'bold',
        }}
      >
        Buy
      </Typography>
      <Typography
        component="span"
        sx={{
          color: '#ff5722',
          ml: 0.5,
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontSize: '1.8rem',
          fontWeight: 'bold',
        }}
      >
        BUY
      </Typography>
    </Box>
  );
}

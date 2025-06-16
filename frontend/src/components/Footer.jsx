import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",               // This pushes footer to bottom if content is short
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {currentYear} BuyBuy, All rights reserved
      </Typography>
      <Link
        component={RouterLink}
        to="/about"
        underline="hover"
        color="inherit"
        sx={{ fontWeight: "medium" }}
      >
        About Us
      </Link>
    </Box>
  );
}

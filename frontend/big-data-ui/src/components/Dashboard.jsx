// src/Dashboard.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Dashboard</Typography>
      {/* Add your graph component here */}
    </Box>
  );
};

export default Dashboard;

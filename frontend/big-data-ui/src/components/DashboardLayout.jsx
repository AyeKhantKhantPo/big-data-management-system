import React, { useState} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Dashboard from "./Dashboard";
import News from "./News";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "news",
    title: "News",
    icon: <BarChartIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const navigate = useNavigate();

  // Add state to manage the toggle state of the menu
  const [isMenuOpen, setMenuOpen] = useState(false); // Default is false (collapsed)

  // Handle navigation for each item
  const handleNavigation = (segment) => {
    if (segment === "dashboard") {
      navigate("/dashboard");
    } else if (segment === "news") {
      navigate("/news");
    }
  };

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen((prevOpen) => !prevOpen); // Toggle the menu state
  };

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => handleNavigation(item.segment), // Attach click handler
      }))}
      branding={{
        logo: <img src="../../assets/data.png" alt="Data logo" />,
        title: "Big Data Management System",
      }}
      theme={demoTheme}
      window={demoWindow}
      isMenuOpen={isMenuOpen} // Control menu toggle state
      onToggleMenu={toggleMenu} // Function to toggle the menu
    >
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/" element={<Dashboard />} /> {/* Default Route */}
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

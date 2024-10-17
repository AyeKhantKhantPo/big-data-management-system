import * as React from "react";
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

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  // const router = useDemoRouter("/dashboard");
  const navigate = useNavigate();

  // Handle navigation for each item
  const handleNavigation = (segment) => {
    if (segment === "dashboard") {
      router.navigate("/dashboard");
    } else if (segment === "news") {
      router.navigate("/news");
    }
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
      // router={router}
      theme={demoTheme}
      window={demoWindow}
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

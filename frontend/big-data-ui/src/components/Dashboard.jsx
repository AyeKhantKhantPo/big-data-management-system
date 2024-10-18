import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register components for chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  // Fetch all data without pagination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await fetch(`http://localhost:8000/api/news-sources?page=1&limit=0`); // limit=0 to fetch all data
        const data = await response.json();

        // Set fetched data
        setNewsData(data.sources);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchData(); // Fetch all data when the component loads
  }, []);

  // Process data for charts
  const categoriesCount = {};
  const countriesCount = {};

  newsData.forEach((source) => {
    // Count categories for Bar chart
    if (categoriesCount[source.category]) {
      categoriesCount[source.category] += 1;
    } else {
      categoriesCount[source.category] = 1;
    }

    // Count countries for Pie chart
    if (countriesCount[source.country]) {
      countriesCount[source.country] += 1;
    } else {
      countriesCount[source.country] = 1;
    }
  });

  // Get top 5 categories and countries for charts
  const getTopData = (dataObj, limit = 5) => {
    return Object.entries(dataObj)
      .sort(([, a], [, b]) => b - a) // Sort in descending order
      .slice(0, limit); // Get top N entries
  };

  const topCategories = getTopData(categoriesCount);
  const topCountries = getTopData(countriesCount);

  // Prepare data for Bar chart (Top 5 Categories)
  const barChartData = {
    labels: topCategories.map(([category]) => category),
    datasets: [
      {
        label: 'Top 5 News Categories',
        data: topCategories.map(([, count]) => count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Pie chart (Top 5 Countries)
  const pieChartData = {
    labels: topCountries.map(([country]) => country),
    datasets: [
      {
        label: 'Top 5 News Sources by Country',
        data: topCountries.map(([, count]) => count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        News Sources Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {/* Bar Chart */}
          <Grid xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Top 5 News Categories
            </Typography>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <Bar
                data={barChartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                height={300} // Limit chart height
              />
            </Paper>
          </Grid>

          {/* Pie Chart */}
          <Grid xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Top 5 News Sources by Country
            </Typography>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <Pie
                data={pieChartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
                height={300} // Limit chart height
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;

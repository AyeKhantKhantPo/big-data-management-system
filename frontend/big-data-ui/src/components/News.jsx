import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const NewsData = () => {
  const [newsData, setNewsData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Start from page 0 (DataGrid pages are zero-based)
    pageSize: 10, // Default page size
  });
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [rowCount, setRowCount] = useState(0); // Total row count for pagination

  const rowCountRef = useRef(rowCount); // To prevent rowCount from being undefined during loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await fetch(
          `http://localhost:8000/api/news-sources?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
        );
        const data = await response.json();

        // Set fetched data
        setNewsData(data.sources);
        setRowCount(data.total); // Set total row count for pagination
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchData(); // Fetch data when page or pageSize changes
  }, [paginationModel.page, paginationModel.pageSize]);

  // Defining columns for DataGrid
  const columns = [
    { field: "source_id", headerName: "Source ID", width: 130 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "country", headerName: "Country", width: 130 },
    {
    field: "description",
    headerName: "Description",
    width: 200,
    renderCell: (params) => (
      <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: '1.8' }}>
        {params.value}
      </div>
    ),
    // Ensure the row height is dynamic
    flex: 1,
  },
    {
    field: "url",
    headerName: "Url",
    width: 180,
    renderCell: (params) => (
      <a href={params.value} target="_blank" rel="noopener noreferrer">
        {params.value}
      </a>
    ),
  },
  ];

    // Handle rowCount to avoid undefined row count during loading
  const computedRowCount = useMemo(() => {
    if (rowCount !== undefined) {
      rowCountRef.current = rowCount;
    }
    return rowCountRef.current;
  }, [rowCount]);

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
      <Typography variant="h5">Top Headlines Sources</Typography>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={newsData}
          columns={columns}
          pagination
          pageSizeOptions={[ 7, 10, 20, 50, 100]} // Options for page size
          rowCount={computedRowCount} // Total row count for pagination
          paginationMode="server" // Enable server-side pagination
          loading={loading} // Show loading indicator while fetching data
          paginationModel={paginationModel} // Pass the pagination model (page, pageSize)
          onPaginationModelChange={setPaginationModel} // Update pagination model on page/pageSize change
          onPageChange={(newPage) => setPage(newPage + 1)} // DataGrid pages are 0-based
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          loading={loading} // Show loading indicator while fetching data
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </Box>
  );
};

export default NewsData;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const GraphPage = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const numBars = parseInt(query.get('bars')) || 0;
  const [selectedBar, setSelectedBar] = useState(null);

  const randomHeights = () => Array.from({ length: numBars }, () => Math.floor(Math.random() * 100) + 50);
  const [barHeights, setBarHeights] = useState([]);

  useEffect(() => {
    setBarHeights(randomHeights());
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ p: 4, width: 400, textAlign: 'center' }}>
        <Box display='flex' flexDirection='row'>
          <Button onClick={() => navigate("/")}><ArrowBackIcon /></Button>
          <Typography variant="h6" gutterBottom>
            Graph Display Page
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-around" alignItems="end" height={200} mt={3} mb={2}>
          {barHeights.map((height, index) => (
            <Box
              key={index}
              sx={{
                width: 30,
                height: height,
                backgroundColor: selectedBar === index ? 'orange' : 'mediumseagreen',
                transition: '0.3s',
                borderRadius: 1
              }}
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
          {Array.from({ length: numBars }).map((_, index) => (
            <Button
              key={index}
              variant={selectedBar === index ? 'contained' : 'outlined'}
              color={selectedBar === index ? 'warning' : 'primary'}
              onClick={() => setSelectedBar(index)}
            >
              Bar {index + 1}
            </Button>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default GraphPage;

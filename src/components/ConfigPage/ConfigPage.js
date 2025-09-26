import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Card } from '@mui/material';

const ConfigPage = () => {
  const navigate = useNavigate();
  const [numBars, setNumBars] = useState('');
  const [isError, setIsError] = useState(false)

  const handleClick = () => {
    if (numBars && !isNaN(numBars) && Number(numBars) > 0) {
      navigate(`/graph?bars=${numBars}`);
    }

    setIsError(true)
  };

  const handleChange =(e) => {
    setNumBars(e.target.value)
    setIsError(false)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ p: 4, width: 300, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Configuration Page
        </Typography>
        <TextField
          fullWidth
          label="Enter number of graph bars"
          variant="outlined"
          value={numBars}
          onChange={(e) => handleChange(e)}
          sx={{ mb: 2 }}
          required
          error={isError}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleClick}
        >
          View Graph
        </Button>
      </Card>
    </Box>
  );
};

export default ConfigPage;

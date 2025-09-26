
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfigPage from './components/ConfigPage/ConfigPage';
import GraphPage from './components/GraphPage/GraphPage';
import { Box } from '@mui/material';

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route exact path="/" element={<ConfigPage />} />
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;

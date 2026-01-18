import { Routes, Route } from 'react-router-dom';
import JobBoard from './pages/JobBoard/JobBoard';
import JobDetails from './pages/JobDetails/JobDetails';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<JobBoard />}
      />
      <Route
        path='jobs/:id'
        element={<JobDetails />}
      />
    </Routes>
  );
}

export default App;

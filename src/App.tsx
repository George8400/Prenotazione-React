import Layout from './components/layouts/Layout';
import Button from './components/core/Button';
import { Navigate, Route, Routes } from 'react-router-dom';
import Results from './pages/results/Results';
import Checkout from './pages/checkout/Checkout';
import UserData from './pages/user-data/UserData';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/prenotazione" />} />
      <Route path="/prenotazione" element={<Layout />}>
        <Route path="" element={<Results />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="user-data" element={<UserData />} />
      </Route>
    </Routes>
  );
}

export default App;

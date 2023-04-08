import Layout from './components/layouts/Layout';
import Button from './components/core/Button';
import { Navigate, Route, Routes } from 'react-router-dom';
import Results from './pages/results/Results';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout-success/CheckoutSuccess';
import Reservation from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Reservation />}>
          <Route path="risultati" element={<Results />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="checkout/success" element={<CheckoutSuccess />} />
      </Routes>
    </Layout>
  );
}

export default App;

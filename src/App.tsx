import Layout from './components/layouts/Layout';
import { Route, Routes } from 'react-router-dom';
import Results from './pages/results/Results';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout-success/CheckoutSuccess';
import Reservation from './pages';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Routes>
            <Route path="/" element={<Reservation />}>
              <Route path="risultati" element={<Results />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
            <Route path="checkout/success" element={<CheckoutSuccess />} />
          </Routes>
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App;

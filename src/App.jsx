import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/AuthProvider'; 
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { CustomerReviews, Footer, Hero, PopularProducts, Services, Booking, SuperQuality } from "./sections";
import Nav from './components/Nav';
import { AuthProvider } from "./components/AuthProvider";
import { Provider } from "react-redux";
import store from "./store";


const PrivateRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/auth" />;
};

const App = () => (
  <AuthProvider>
    <Provider store={store}>
  <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfilePage/>} />} />
      </Routes>
  </Router>
  </Provider>
  </AuthProvider>
);

const HomePage = () => (
  <>
  <Nav />
    <section className="x1:padding-1 wide:pidding-r padding-b">
      <Hero />
    </section>
    <section className="padding">
      <PopularProducts />
    </section>
    <section className="padding-x py-10">
      <Services />
    </section>
    <section className="padding">
      <SuperQuality />
    </section>
    <section className="bg-pale-black padding">
      <CustomerReviews />
    </section>
    <section className="padding-x sm:py-32 py-16 w-full">
      <Booking />
    </section>
    <Footer />
  </>
);

export default App;

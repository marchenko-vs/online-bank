import './App.css';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Cards from './pages/Cards';
import Transaction from './pages/Transaction';

function App() {
  return (
    <>
    <AuthContextProvider>
    <header>
        <Navbar />
    </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/settings" element={<Settings />} />
          <Route path="/accounts/me" element={<Account />} />
          <Route path="/accounts/:accountId/cards" element={<Cards />} />
          <Route path="/accounts/:accountId/cards/:cardId/send" element={<Transaction />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthContextProvider>
      {/* <footer></footer> */}
    </>
  );
}

export default App;

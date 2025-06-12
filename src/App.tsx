import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext";
import Jackpot from "./pages/Jackpot";
import Affiliates from "./pages/Affiliates";


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Jackpot />} />
            <Route path="/affiliates" element={<Affiliates />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </UserProvider>
  );
}

export default App;

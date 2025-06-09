import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </UserProvider>
  );
}

export default App;

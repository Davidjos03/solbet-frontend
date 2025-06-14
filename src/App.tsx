import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Add this
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext";
import Layout from "./components/layout/Layout";
import Jackpot from "./pages/Jackpot";
import Affiliates from "./pages/Affiliates";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* Wrap everything with QueryClientProvider */}
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Jackpot />} />
              <Route path="/affiliates" element={<Affiliates />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
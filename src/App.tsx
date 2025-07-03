import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext";
import Layout from "./components/layout/Layout";
import Jackpot from "./pages/Jackpot";
import Affiliates from "./pages/Affiliates";
import { WalletProvider } from "./contexts/WalletContext";
// Import your new account components
import AccountLayout from "./pages/account/AccountLayout";
import OptionsPage from "./pages/account/Options";
import StatisticsPage from "./pages/account/Statistics";
import TransactionsPage from "./pages/account/Transactions";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Jackpot />} />
                <Route path="/affiliates" element={<Affiliates />} />

                {/* Add account nested routes */}
                <Route path="/account" element={<AccountLayout />}>
                  <Route path="options" element={<OptionsPage />} />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="transactions" element={<TransactionsPage />} />
                </Route>
              </Route>
            </Routes>
          </Router>
          <Toaster position="top-right" />
        </UserProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
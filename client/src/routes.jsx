// src/router.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PortfolioDetail from "./pages/portfolios-page/PortfolioDetail";
import CreatePortfolio from "./pages/portfolios-page/CreatePortfolio";
import EditPortfolio from "./pages/portfolios-page/EditPortfolio";
import StatisticsPage from "./pages/StatisticsPage";
import HelpApiGemini from "./pages/HelpApiGemini";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "portfolios/create",
            element: <CreatePortfolio />,
          },
          {
            path: "portfolios/:id",
            element: <PortfolioDetail />,
          },
          {
            path: "portfolios/:id/edit",
            element: <EditPortfolio />,
          },
        ],
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/help-api-gemini",
        element: <HelpApiGemini />,
      },
    ],
  },
]);

export default router;

// src/router.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StatisticsPage from "./pages/StatisticsPage";
import HelpApiGemini from "./pages/HelpApiGemini";
import NewsPage from "./pages/NewsPage";
import Portfolio from "./pages/Portfolio";
import CoinDetails from "./pages/CoinDetails";
import ProfilePage from "./pages/ProfilePage";

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
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/help-api-gemini",
        element: <HelpApiGemini />,
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/coin/:id",
        element: <CoinDetails />,
      },
    ],
  },
]);

export default router;

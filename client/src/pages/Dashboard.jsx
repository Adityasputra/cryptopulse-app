import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Balance from "../components/Balance";
import BuySection from "../components/BuySection";
import Portfolio from "../components/Portfolio";
import Sidebar from "../components/Sidebar";
import Statistics from "../components/Statistics";
import Watchlist from "../components/Watchlist";
import InputForm from "../components/InputForm";
import OutputForm from "../components/OutputForm";
import axios from "../services/axiosInstance";
import { fetchCoins } from "../features/coinsSlice";
import PortfolioList from "./portfolios-page/PortfolioList";

export default function Dashboard() {
  const [output, setOutput] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const dispatch = useDispatch();
  const { coins, status } = useSelector((state) => state.coins);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const { data } = await axios.get("/api/coins/data/markets");
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
  }, []);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data } = await axios.get("/api/portfolios/user");
        setPortfolios(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    fetchPortfolios();
  }, []);

  const handleInputUser = async (prompt) => {
    try {
      const { data } = await axios.post("/gemini", { input: prompt });
      setOutput(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-900 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Balance />
          <Watchlist coins={coins} />
          <Statistics marketData={marketData} />
          <BuySection />
          <Portfolio coins={coins} />
          <InputForm prompt={handleInputUser} />
          {output && <OutputForm output={output} />}
        </div>
        <div className="mt-6">
          <PortfolioList portfolios={portfolios} />
        </div>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import BuySection from "../components/BuySection";
import Portfolio from "../components/Portfolio";
import Sidebar from "../components/Sidebar";
import Statistics from "../components/Statistics";
import Watchlist from "../components/Watchlist";
import InputForm from "../components/InputForm";
import OutputForm from "../components/OutputForm";
import { fetchCoins } from "../features/coinsSlice";
import axios from "../services/axiosInstance";

export default function Dashboard() {
  const [output, setOutput] = useState("");
  const dispatch = useDispatch();
  const { coins, status } = useSelector((state) => state.coins);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  const handleInputUser = async (prompt) => {
    try {
      const { data } = await axios.post("/gemini", { input: prompt });
      console.log(data, '<--- data 1')
      setOutput(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Output", output)
  }, [output])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-900 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Balance />
          <Watchlist coins={coins} />
          <Statistics />
          <BuySection />
          <Portfolio coins={coins} />
          <InputForm prompt={handleInputUser} />
          {output && <OutputForm output={output} />}
        </div>
      </div>
    </div>
  );
}

import Balance from "../components/Balance";
import BuySection from "../components/BuySection";
import Portfolio from "../components/Portfolio";
import Sidebar from "../components/Sidebar";
import Statistics from "../components/Statistics";
import Watchlist from "../components/Watchlist";

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-900 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Balance />
            <Watchlist />
            <Statistics />
            <BuySection />
            <Portfolio />
          </div>
        </div>
      </div>
    </>
  );
}

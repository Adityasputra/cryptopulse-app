import Sidebar from "../components/Sidebar";

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

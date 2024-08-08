import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-10">
          <NavLink
            to="/dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/wallet"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Wallet
          </NavLink>
          <NavLink
            to="/statistics"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Statistics
          </NavLink>
          <NavLink
            to="/exchange"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Exchange
          </NavLink>
          <NavLink
            to="/news"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            News
          </NavLink>
        </nav>
      </div>
    </>
  );
}

import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("access_token");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-[rgba(255,255,255,0.1)] backdrop-blur-md text-white border-r border-gray-700">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2 text-indigo-300">
          Digital Currency
        </h1>
        <h2 className="text-lg font-semibold text-gray-300">Markets</h2>
      </div>
      <nav className="mt-4">
        <NavLink
          to="/dashboard"
          className="flex items-center py-3 px-6 rounded-md mb-2 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
          activeClassName="text-indigo-300"
        >
          <HomeIcon className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/statistics"
          className="flex items-center py-3 px-6 rounded-md mb-2 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
          activeClassName="text-indigo-300"
        >
          <ChartBarIcon className="w-5 h-5 mr-3" />
          Statistics
        </NavLink>
        <NavLink
          to="/exchange"
          className="flex items-center py-3 px-6 rounded-md mb-2 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
          activeClassName="text-indigo-300"
        >
          <CurrencyDollarIcon className="w-5 h-5 mr-3" />
          Exchange
        </NavLink>
        <NavLink
          to="/news"
          className="flex items-center py-3 px-6 rounded-md mb-2 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
          activeClassName="text-indigo-300"
        >
          <NewspaperIcon className="w-5 h-5 mr-3" />
          News
        </NavLink>
        <NavLink
          to="/help-api-gemini"
          className="flex items-center py-3 px-6 rounded-md mb-2 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
          activeClassName="text-indigo-300"
        >
          <QuestionMarkCircleIcon className="w-5 h-5 mr-3" />
          Help with Gemini
        </NavLink>
        <NavLink
          to="/portfolio"
          className="flex items-center py-3 px-6 rounded-md mb-2 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
          activeClassName="text-indigo-300"
        >
          <BriefcaseIcon className="w-5 h-5 mr-3" />
          Portfolio
        </NavLink>
        <NavLink
          to="/profile/:id"
          className="flex items-center py-3 px-6 rounded-md mb-2 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
          activeClassName="text-indigo-300"
        >
          <UserIcon className="w-5 h-5 mr-3" />
          Profile
        </NavLink>
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center py-3 px-6 rounded-md mt-6 text-gray-200 hover:text-indigo-300 transition-colors duration-200"
      >
        <HomeIcon className="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  );
}

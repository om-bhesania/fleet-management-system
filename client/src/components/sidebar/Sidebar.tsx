import { Home, Info, Logout } from "@mui/icons-material";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-[250px] bg-gray-900 text-white fixed top-0 bottom-0">
      <div className="flex-grow">
        <div className="flex flex-col space-y-4 p-4">
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
              alt=""
              className="max-h-[30px]"
            />
          </a>
          <Link
            to="/"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <Home />
            <span>Home</span>
          </Link>
          <Link
            to="/add-fleet"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <Info />
            <span>Add Fleet Details</span>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div
          role="button"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          onClick={() => {
            Cookies.remove("token");
            Cookies.remove("user");
            window.location.reload();
          }}
        >
          <Logout />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

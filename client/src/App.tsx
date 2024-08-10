import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/auth/protected/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/sidebar/Sidebar";
import FleetData from "./components/getFleet/FleetTable";
import TopBar from "./components/topBar/TopBar";
import { AddFleetForm } from "./components/addFleet/AddFleetForm";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col pl-[250px]">
          <TopBar />
          <main className="flex-1 p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <FleetData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-fleet"
                element={
                  <ProtectedRoute>
                    <AddFleetForm />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/auth/protected/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/sidebar/Sidebar";
import Test from "./components/dataTable/Test";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 pl-[250px]">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

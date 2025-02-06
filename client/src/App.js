import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./components";
import { HomePage, StatisticsPage, UserPage, AuthPage } from "./pages";
import "@fortawesome/fontawesome-free/css/all.min.css";
import style from "./App.module.css";
import { useState, useEffect } from "react";

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          navigate("/auth");
        }
      } catch (error) {
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);
  return (
    <div className={style.App}>
      <Header userData={userData} setUserData={setUserData} />
      <Routes>
        <Route
          path="/"
          element={<HomePage userData={userData} loading={loading} />}
        />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

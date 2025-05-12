import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.page";
import Favourites from "./pages/Dashboard/Favourites.page";
import Profile from "./pages/Dashboard/Profile.page";
import MovieDetail from "./pages/Detail/MovieDetail.page";
import Home from "./pages/Home/Home.page";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/film/:filmname" element={<MovieDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
    </Router>
  );
};

export default App;

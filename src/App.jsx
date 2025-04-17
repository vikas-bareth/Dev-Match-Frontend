import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Feed from "./components/Feed";
import PageNotFound from "./components/PageNotFound";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { BadgeProvider } from "./context/BadgeContext";
import Signup from "./components/Signup";

function App() {
  return (
    <Provider store={appStore}>
      <BadgeProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </BadgeProvider>
    </Provider>
  );
}

export default App;

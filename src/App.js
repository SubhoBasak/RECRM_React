import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

// components
import Sidebar from "./components/Sidebar";

// pages
import Home from "./pages/Home";
import AllContacts from "./pages/AllContacts";
import Properties from "./pages/Properties";
import Requirements from "./pages/Requirements";
import ClientDetails from "./pages/ClientDetails";
import Property from "./pages/Property";
import AgentDetails from "./pages/AgentDetails";
import CompanyDetails from "./pages/CompanyDetails";
import RepresentativeDetails from "./pages/RepresentativeDetails";

const App = () => {
  const [theme, setTheme] = React.useState(false);

  return (
    <HashRouter>
      <div className={"d-flex" + (theme ? " dark" : "")}>
        <Sidebar />
        <div
          className="bg-light flex-grow-1"
          style={{
            minHeight: "100vh",
            maxHeight: "100vh",
            overflowY: "scroll",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<Home theme={theme} setTheme={setTheme} />}
            />
            <Route path="/all_contacts" element={<AllContacts />} />
            <Route path="/agent_details/:id?" element={<AgentDetails />} />
            <Route path="/client_details/:id?" element={<ClientDetails />} />
            <Route path="/company_details/:id?" element={<CompanyDetails />} />
            <Route path="/properties/:folder?" element={<Properties />} />
            <Route path="/property/:id?" element={<Property />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route
              path="/representative/:id?"
              element={<RepresentativeDetails />}
            />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;

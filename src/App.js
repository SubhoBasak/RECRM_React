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
import Project from "./pages/Project";
import Property from "./pages/Property";
import AgentDetails from "./pages/AgentDetails";
import CompanyDetails from "./pages/CompanyDetails";

const App = () => {
  return (
    <HashRouter>
      <div className="d-flex">
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
            <Route path="/" element={<Home />} />
            <Route path="/all_contacts" element={<AllContacts />} />
            <Route path="/agent_details" element={<AgentDetails />} />
            <Route path="/client_details" element={<ClientDetails />} />
            <Route path="/company_details" element={<CompanyDetails />} />
            <Route path="/project" element={<Project />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property" element={<Property />} />
            <Route path="/requirements" element={<Requirements />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;

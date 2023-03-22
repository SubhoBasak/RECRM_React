import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

// components
import Sidebar from "./components/Sidebar";

// pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Lead from "./pages/Lead";
import Users from "./pages/Users";
import Property from "./pages/Property";
import Properties from "./pages/Properties";
import AllContacts from "./pages/AllContacts";
import Requirement from "./pages/Requirement";
import UserDetails from "./pages/UserDetails";
import BottomBar from "./components/BottomBar";
import AgentDetails from "./pages/AgentDetails";
import ClientDetails from "./pages/ClientDetails";
import FolderDetails from "./pages/FolderDetails";
import CompanyDetails from "./pages/CompanyDetails";
import RequirementCompany from "./pages/RequirementCompany";
import RepresentativeDetails from "./pages/RepresentativeDetails";

const App = () => {
  const [theme, setTheme] = React.useState(false);

  return (
    <HashRouter>
      <div className={"d-flex" + (theme ? " dark" : "")}>
        <Sidebar />
        <div
          className="bg-light flex-grow-1 mb-5 mb-md-0"
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
            <Route path="/auth/:next?" element={<Auth />} />
            <Route path="/all_contacts" element={<AllContacts />} />
            <Route path="/agent_details/:id?" element={<AgentDetails />} />
            <Route path="/client_details/:id?" element={<ClientDetails />} />
            <Route path="/company_details/:id?" element={<CompanyDetails />} />
            <Route path="/folder_details/:id" element={<FolderDetails />} />
            <Route path="/leads" element={<Lead />} />
            <Route path="/properties/:folder?" element={<Properties />} />
            <Route path="/property/:id?" element={<Property />} />
            <Route path="/requirement/:id" element={<Requirement />} />
            <Route
              path="/companyRequirement/:id"
              element={<RequirementCompany />}
            />
            <Route
              path="/representative/:id?"
              element={<RepresentativeDetails />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/user_details/:id?" element={<UserDetails />} />
          </Routes>
        </div>
        <BottomBar />
      </div>
    </HashRouter>
  );
};

export default App;

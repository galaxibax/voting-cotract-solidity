import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/layout";
import MainPage from "./pages/mainPage/mainPage";
import NewLocker from "./pages/newLocker/newLocker";
import Proposal from "./pages/proposalList/proposalList";
import MakeProposal from "./pages/makeProposal/makeProposal";
import ProposalDetail from "./pages/proposalDetail/proposalDetail";
import CreateProposal from "./pages/createProposal/createProposal";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<MainPage />} />
            <Route path="/newlocker" element={<NewLocker />} />
            <Route path="/proposal" element={<MakeProposal />} />
            <Route path="/proposalcreate" element={<CreateProposal />} />
            <Route path="/proposallist" element={<Proposal />} />
            <Route path="/proposaldetail/:id" element={<ProposalDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

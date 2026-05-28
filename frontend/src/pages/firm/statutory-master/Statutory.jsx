import React, { useState } from 'react';
import PageTitle from '../../../components/dashboard/PageTitle';
import TabNavigation from '../../../components/dashboard/tab/TabNavigation';
import PfTab from './tabs/pfTab';
import EsiTab from './tabs/esiTab';


const Statutory = () => {
  const [activeTab, setActiveTab] = useState("pf");

  const tabs = [
    { key: "pf", label: "PF" },
    { key: "esic", label: "ESIC" },
  ];

  const handleSelectTab = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <div className="statutory-tab mt-4">
      <PageTitle
        title="Statutory Settings"
        iname="bx bx-building-house"
      />
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onSelectTab={handleSelectTab} 
      />
      {activeTab === "pf" && <PfTab />}
      {activeTab === "esic" && <EsiTab />}
    </div>
  );
};

export default Statutory;
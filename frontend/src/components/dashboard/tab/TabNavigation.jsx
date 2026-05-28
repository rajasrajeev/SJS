import React from "react";
import { Nav } from "react-bootstrap";
import "./TabNavigation.scss";

const TabNavigation = ({ tabs, activeTab, onSelectTab }) => {
  return (
    //Nav Tab Navigation
    <Nav variant="tabs" activeKey={activeTab} onSelect={onSelectTab} className="tab-navigation">
      {tabs.map((tab) => (
        <Nav.Item key={tab.key}>
          <Nav.Link eventKey={tab.key}>{tab.label}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default TabNavigation;

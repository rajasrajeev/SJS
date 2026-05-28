import React, { useState } from "react";
import "./AddLocation.scss";
import PageTitle from "../../../components/dashboard/PageTitle";
import TabNavigation from "../../../components/dashboard/tab/TabNavigation";
import CountryTab from "./tabs/CountryTab";
import StateTab from "./tabs/StateTab";
import DistrictTab from "./tabs/DistrictTab";
import { clearLocation } from "../../../features/locationSlice";
import { useDispatch } from 'react-redux';

const AddLocation = () => {
    const [activeTab, setActiveTab] = useState("country"); 
    const dispatch = useDispatch();
    const tabs = [
        { key: "country", label: "Country" },
        { key: "state", label: "State" },
        { key: "district", label: "District" },
    ];

    const handleSelectTab = (tabKey) => {
        dispatch(clearLocation());
        setActiveTab(tabKey);
    };

    return (
        <div className="mt-4">
            <PageTitle
                title="Location Master"
                iname="bi bi-globe"
            />
            <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onSelectTab={handleSelectTab} 
            />
            {activeTab === "country" &&
                <CountryTab/>
            }
            {activeTab === "state" &&
                <StateTab/>
            }
            {activeTab === "district" &&
                <DistrictTab/>
            }
        </div>
    );
};

export default AddLocation;
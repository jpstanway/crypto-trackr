import React, { useState } from "react";

import TabbedContainerBtn from "../tabbed-container-btn/TabbedContainerBtn";
import TabbedContainerData from "../tabbed-container-data/TabbedContainerData";

const TabbedContainer = ({ trends }) => {
  const [activeTab, setActiveTab] = useState("1d");
  return (
    <div className="tabbed-container">
      <div className="tabbed-container__tabs">
        {trends.map((trend) => (
          <TabbedContainerBtn
            key={trend[0] + "b"}
            trend={trend[0]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      {trends.map((trend) => (
        <TabbedContainerData
          key={trend[0]}
          trend={trend}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
};

export default TabbedContainer;

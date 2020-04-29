import React from "react";

const TabbedContainerBtn = ({ trend, activeTab, setActiveTab }) => (
  <div className="tabbed-container__tab">
    <button
      onClick={() => setActiveTab(trend)}
      className={`tabbed-container__btn ${
        activeTab === trend ? "tabbed-container__btn--active" : ""
      }`}
    >
      {trend}
    </button>
  </div>
);

export default TabbedContainerBtn;

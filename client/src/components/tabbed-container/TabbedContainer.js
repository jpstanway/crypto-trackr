import React, { useState } from "react";

import convertToCurrency from "../../utils/convertToCurrency";
import convertToSinglePercent from "../../utils/convertToSinglePercent";
import { checkNegative, reformatNegative } from "./TabbedContainer.utils";

const TabbedContainer = ({ trends }) => {
  const [activeTab, setActiveTab] = useState("1d");
  return (
    <div className="tabbed-container">
      <div className="tabbed-container__tabs">
        {trends.map((trend) => (
          <div key={trend[0] + "b"} className="tabbed-container__tab">
            <button
              onClick={() => setActiveTab(trend[0])}
              className={`tabbed-container__btn ${
                activeTab === trend[0] ? "tabbed-container__btn--active" : ""
              }`}
            >
              {trend[0]}
            </button>
          </div>
        ))}
      </div>
      {trends.map((trend) => (
        <div
          key={trend[0]}
          className={`tabbed-container__data ${
            activeTab === trend[0] ? "tabbed-container__data--active" : ""
          }`}
        >
          price change:
          {!trend[1] || !trend[1].price_change ? (
            <span>
              {" "}
              <em>No data available</em>
            </span>
          ) : (
            <>
              <span
                className={`tabbed-container__price-change ${checkNegative(
                  trend[1].price_change
                )}`}
              >
                {reformatNegative(
                  convertToCurrency(trend[1].price_change, true)
                )}
              </span>
              <span
                className={`tabbed-container__price-change-pct ${checkNegative(
                  trend[1].price_change_pct,
                  true
                )}`}
              >
                ({convertToSinglePercent(trend[1].price_change_pct)})
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabbedContainer;

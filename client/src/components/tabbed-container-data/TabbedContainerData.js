import React from "react";

import convertToCurrency from "../../utils/convertToCurrency";
import convertToSinglePercent from "../../utils/convertToSinglePercent";
import { checkNegative, reformatNegative } from "./TabbedContainerData.utils";

const TabbedContainerData = ({ trend, activeTab }) => (
  <div
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
          {reformatNegative(convertToCurrency(trend[1].price_change, true))}
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
);

export default TabbedContainerData;

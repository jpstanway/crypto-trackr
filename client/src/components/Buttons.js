import React from "react";

const Buttons = ({ filter, setFilter, allCryptos }) => {
  const handlePrev = () => {
    const prevFilter = {
      min: filter.min - 10,
      max: filter.max - 10
    };

    setFilter(prevFilter);
  };

  const handleNext = () => {
    const nextFilter = {
      min: filter.min + 10,
      max: filter.max + 10
    };

    setFilter(nextFilter);
  };

  return (
    <div className="home-btns">
      <button
        onClick={handlePrev}
        className={`btn btn-large ${filter.min === 1 ? "btn-disabled" : ""}`}
        disabled={filter.min === 1}
      >
        prev 10
      </button>
      <button
        onClick={handleNext}
        className={`btn btn-large ${
          filter.max === allCryptos.length ? "btn-disabled" : ""
        }`}
        disabled={filter.max === allCryptos.length}
      >
        next 10
      </button>
    </div>
  );
};

export default Buttons;

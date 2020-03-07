import React from "react";

const Footer = () => {
  const date = new Date();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {date.getFullYear()} Crypto Trackr. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

import React from "react";

const Locations = () => {
  return (
    <div className="locations">
      <h4>Our locations</h4>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=134DaKCngAO_HSqxOBnbmF5OqsV-mNsI&ehbc=2E312F&noprof=1"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        aria-hidden="false"
        referrerPolicy="no-referrer-when-downgrade"
        title="locations-map"
      ></iframe>
    </div>
  );
};

export default Locations;

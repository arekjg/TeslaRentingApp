import React from "react";

const Locations = () => {
  return (
    <div className="locations">
      <h4>Our locations</h4>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=134DaKCngAO_HSqxOBnbmF5OqsV-mNsI&ehbc=2E312F&noprof=1"
        width="640"
        height="480"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        aria-hidden="false"
        referrerpolicy="no-referrer-when-downgrade"
        title="locations-map"
      ></iframe>
    </div>
  );
};

export default Locations;

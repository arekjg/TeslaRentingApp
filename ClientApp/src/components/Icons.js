export const SeatIcon = ({ seats }) => (
  <span title="Number of seats">
    <img
      src="../images/SeatIcon.svg"
      className="details-icon svg-icon"
      alt=""
    />
    {seats}
  </span>
);

export const CapacityIcon = ({ capacity }) => (
  <span title="Cargo Capacity">
    <img
      src="../images/CapacityIcon.svg"
      className="details-icon svg-icon"
      alt=""
    />{" "}
    {capacity} cu ft&emsp;
  </span>
);

export const RangeIcon = ({ range }) => (
  <span title="Range">
    <img
      src="../images/RangeIcon.svg"
      className="details-icon svg-icon"
      alt=""
    />{" "}
    {range} mi
  </span>
);

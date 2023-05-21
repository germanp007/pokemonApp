import "./button.css";

export const Button = ({ value, handleClick }) => {
  return (
    <div className="button-box">
      <button onClick={handleClick}>{value}</button>
      <div className="button-shadow"></div>
    </div>
  );
};

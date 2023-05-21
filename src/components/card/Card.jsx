import "./card.css";

export const Card = ({ name, img }) => {
  return (
    <div className="card">
      <p className="card-name">{name}</p>
      <div className="circle"></div>
      <img src={img} alt="pokemon-img" className="card-img" />
    </div>
  );
};

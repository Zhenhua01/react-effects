
function Card({ idx, card }) {
  return (
    <img key={idx}
      src={card.image}
      alt={`${card.value} ${card.suit}`}
      width="100px" />
  );
}

export default Card;

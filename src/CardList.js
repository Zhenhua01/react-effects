import Card from "./Card";

function CardList({ cards }) {
  return cards.map((card, idx) => (
    <Card key={idx} card={card} idx={idx} />
  ));
}

export default CardList;
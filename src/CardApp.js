import React, { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./CardList";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

function CardApp() {

  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({
    deckId: null,
    remaining: null,
    isLoading: true
  });

  //FIXME: WHY 2x deck calls?
  useEffect(function fetchNewDeckOnLoad() {
    console.log("use effect");
    async function fetchNewDeck() {
      const result = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck({
        deckId: result.data.deck_id,
        remaining: result.data.remaining,
        isLoading: false
      });
    }

    fetchNewDeck();
  }, []);
  console.log("deck in app", deck);

  async function getACard() {
    //throw error when cards run out
    const result = await axios.get(`${BASE_URL}/${deck.deckId}/draw/`);
    const cardCopy = [...cards, ...result.data.cards];
    setCards(cardCopy);

    setDeck({
      ...deck,
      remaining: result.data.remaining,
    });
  }

  if (deck.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <button onClick={getACard}>Get New Card </button>
      <br />
      <CardList cards={cards} />
    </div>
  );

}

export default CardApp;
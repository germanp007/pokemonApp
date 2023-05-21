import { useState, useEffect } from "react";
import { Button } from "./components/buttons/Button";
import { Card } from "./components/card/Card";
import Logo from "./components/Logo";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import "./app.css";
export const App = () => {
  const [pokemonId, setPokemonId] = useState(1);

  const [allEvolutions, setAllEvolutions] = useState([]);

  useEffect(() => {
    getEvolutions(pokemonId);
  }, [pokemonId]);

  const getEvolutions = async (id) => {
    let pokemonArray = [];
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
    const { chain } = await response.json();
    let pokemonLv1 = chain.species.name;
    let pokemonimgLv1 = await getPokemonimages(pokemonLv1);
    pokemonArray.push([pokemonLv1, pokemonimgLv1]);
    if (chain.evolves_to.length !== 0) {
      let pokemonLv2 = chain.evolves_to[0].species.name;
      let pokemonimgLv2 = await getPokemonimages(pokemonLv2);
      pokemonArray.push([pokemonLv2, pokemonimgLv2]);
      if (chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonLv3 = chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonimgLv3 = await getPokemonimages(pokemonLv3);
        pokemonArray.push([pokemonLv3, pokemonimgLv3]);
        console.log(pokemonArray);
      }
      setAllEvolutions(pokemonArray);
    }
  };

  const getPokemonimages = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);

    const data = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  };

  const previousButton = () => {
    pokemonId > 1 ? setPokemonId(pokemonId - 1) : setPokemonId(1);
    getEvolutions(pokemonId);
  };
  const nextButton = () => {
    setPokemonId(pokemonId + 1);
    getEvolutions(pokemonId);
  };
  return (
    <div className="app">
      <div className={`card-container container${allEvolutions.length}`}>
        {allEvolutions.map((pokemon, index) => (
          <Card key={index} name={pokemon[0]} img={pokemon[1]} />
        ))}
      </div>
      <div className="buttons-container">
        <Button value={<TiArrowLeftOutline />} handleClick={previousButton} />

        <Button value={<TiArrowRightOutline />} handleClick={nextButton} />
      </div>
      <div className="logo-container">
        <Logo />
      </div>
    </div>
  );
};

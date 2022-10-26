import {  useEffect, useState } from "react";
import PokemonThummail from "./components/PokemonThummail";


function App() {

  const[allPokemons, setAllPokemons]= useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=40')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()

        setAllPokemons( currentList => [...currentList, data])

        //await allPokemons.sort((a, b) => a.id - b.id)
        
      })
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }

  useEffect(() => {
    getAllPokemons()
   }, [])

  return (
    <div className="app-container">
      <h1>POKEMONS</h1>
      <div className="pokemon-container" >
        <div className="all-container">
        {allPokemons.map( (pokemonStats, index) =>  
           <PokemonThummail
           key={index}
           id={pokemonStats.id}
           image={pokemonStats.sprites.other.dream_world.front_default}
           name={pokemonStats.name}
           type={pokemonStats.types[0].type.name}
            />
            )}
        
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Cargar Más</button>
      </div>
    </div>
  );
}

export default App;

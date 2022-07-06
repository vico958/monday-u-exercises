// The Pokemon Client (using axios) goes here
import axios from 'axios';
export default class PokemonClient{
    constructor(){
        this.apiUrl = "https://pokeapi.co/api/v2/pokemon/";
    } 
    async createListPokemonToCatchMessage(pokemonsIdList){
        const pokemonsToReturn = [];
        const allFetching = [];
        try{
            pokemonsIdList.forEach((pokemonId) => {
                allFetching.push(axios.get(`${this.apiUrl}${pokemonId}`));
        });
            const pokemonsInfo = await Promise.all(allFetching);
            pokemonsInfo.forEach(pokemon => {
                const stringOfPokemonType = this.getPokemonTypes(pokemon.data);
                pokemonsToReturn.push(`Catch ${pokemon.data.name} the ${stringOfPokemonType} type pokemon`);
            })
        }catch (error) {
            pokemonsToReturn.push(`Faild to fetch pokemon with this input : ${pokemonsIdList}`)
        }
        return pokemonsToReturn;
}

getPokemonTypes(pokemon){
    let stringOfPokemonType = "";
    pokemon.types.forEach(value => {
        stringOfPokemonType += `${value.type.name}/`;
    })
    stringOfPokemonType = stringOfPokemonType.slice(0, -1);
    return stringOfPokemonType;
}
async createPokemonToCatchMessage(pokemonId){
    try{
        const pokemonInfo = await axios.get(`${this.apiUrl}${pokemonId}`)
        const pokemonData = pokemonInfo.data;
        return `Catch ${pokemonData.name} the ${this.getPokemonTypes(pokemonData)} type pokemon`;
    }
    catch(error){
        return `Pokemon with ID ${pokemonId} was not found`;
    }
    }
}

class PokemonClient{
    constructor(){}
    async getListPokemonInfo(pokemonsIdList){
        let pokemonsToReturn = [];
        const allFetching = [];
        try{
            pokemonsIdList.forEach((pokemonId) => {
                allFetching.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`));
        });
            await Promise.all(allFetching).then(results => {
                return Promise.all(results.map(response => response.json()));
            }).then(pokemons => {
                pokemons.forEach(pokemon => {
                    let stringOfPokemonType = this.getPokemonTypes(pokemon);
                    pokemonsToReturn.push(`Catch ${pokemon.name} the ${stringOfPokemonType} type pokemon`);
                })
            })
            return pokemonsToReturn;
        }catch (error) {
            throw `Faild to fetch pokemon with this input : ${pokemonsIdList}`;
    }
}

getPokemonTypes(pokemon){
    let stringOfPokemonType = "";
    pokemon.types.forEach(types => {
        stringOfPokemonType += `${types.type.name}/`;
    })
    stringOfPokemonType = stringOfPokemonType.slice(0, -1);
    return stringOfPokemonType;
}
async getSinglePokemonInfo(pokemonId){
    try{
        const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const pokemonJson = await pokemonInfo.json();
        return `Catch ${pokemonJson.name} the ${this.getPokemonTypes(pokemonJson)} type pokemon`;
    }
    catch(error){
        return `Pokemon with ID ${pokemonId} was not found`;
    }
    }
}
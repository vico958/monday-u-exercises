    import fetch from 'node-fetch';

    export class PokemonClient{
        constructor(){
            this.apiUrl = "https://pokeapi.co/api/v2/pokemon/";
        } 
        async createListPokemonToCatchMessage(pokemonsIdList){
            const pokemonsToReturn = [];
            const allFetching = [];
            try{
                pokemonsIdList.forEach((pokemonId) => {
                    allFetching.push(fetch(`${this.apiUrl}${pokemonId}`));
            });
                await Promise.all(allFetching).then(results => {
                    return Promise.all(results.map(response => response.json()));
                }).then(pokemons => {
                    pokemons.forEach(pokemon => {
                        const stringOfPokemonType = this.getPokemonTypes(pokemon);
                        pokemonsToReturn.push(`Catch ${pokemon.name} the ${stringOfPokemonType} type pokemon`);
                    })
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
    async createSinglePokemonToCatchMessage(pokemonId){
        try{
            const pokemonInfo = await fetch(`${this.apiUrl}${pokemonId}`)
            const pokemonJson = await pokemonInfo.json();
            return `Catch ${pokemonJson.name} the ${this.getPokemonTypes(pokemonJson)} type pokemon`;
        }
        catch(error){
            return `Pokemon with ID ${pokemonId} was not found`;
        }
        }
    }
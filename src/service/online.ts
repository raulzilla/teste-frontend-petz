import api from "./api";

type FetchDefaultTypes = () => Promise<string[]>
type FetchPokemonGenerationTypes = (pokemon: string) => Promise<{ name: string, generation: number } | undefined>

const fetchLocation: FetchDefaultTypes = async () => {
  try {
    const responseLocation = await api({
      environment: 'online',
      method: 'get',
      endpoint: '/location?offset=0&limit=850'
    })

    const locations = responseLocation.results.map((result: { name: string; }) => result.name)

    return locations
  } catch (error) {
    console.error("Ocorreu um erro na requisição:", error);
  }
}

const fetchRegion: FetchDefaultTypes = async () => {
  try {
    const responseRegion = await api({
      environment: 'online',
      method: 'get',
      endpoint: '/region'
    })

    const regions = responseRegion.results.map((result: { name: string; }) => result.name)

    return regions
  } catch (error) {
    console.error("Ocorreu um erro na requisição:", error);
  }
}

const fetchPokemons: FetchDefaultTypes = async () => {
  try {
    const responsePokemons = await api({
      environment: 'online',
      method: 'get',
      endpoint: '/pokemon?offset=0&limit=1291'
    })

    const pokemons = responsePokemons.results.map((result: { name: string; }) => result.name)

    return pokemons
  } catch (error) {
    console.error("Ocorreu um erro na requisição:", error);
  }
}

const fetchPokemonGeneration: FetchPokemonGenerationTypes = async (pokemon) => {
  try {
    const responsePokemon = await api({
      environment: 'online',
      method: 'get',
      endpoint: `/pokemon/${pokemon}`
    })

    const endpointGeneration = await responsePokemon.species.url.split('v2')[1]

    const responseGeneration = await api({
      environment: 'online',
      method: 'get',
      endpoint: `${endpointGeneration}`
    })


    const name = responseGeneration.generation.name ?? '';
    const generationUrl = responseGeneration.generation.url.split('generation/')[1].replaceAll('/', '');
    const generation = generationUrl ? +generationUrl : 0;

    return {
      name,
      generation,
    };
  } catch (error) {
    console.error("Ocorreu um erro na requisição:", error);
  }
}


export const online = {
  fetchLocation,
  fetchRegion,
  fetchPokemons,
  fetchPokemonGeneration
}

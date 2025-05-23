

export function getPokemonId(url: string) {
    return parseInt(url.split('/').at(-2)!, 10);

}

export function getPokemonArtwork(id: number | string) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

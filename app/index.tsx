import { Link } from "expo-router";
import {Text, View, StyleSheet, Image, FlatList, ActivityIndicator} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColors} from "@/hooks/useThemeColors";
import {Card} from "@/components/Card";
import {PokemonCard} from "@/components/pokemon/PokemonCard";
import {useFetchQuery, useInfiniteFetchQuery} from "@/hooks/useFetchQuery";
import {getPokemonId} from "@/functions/pokemon";
import {SearchBar} from "@/components/SearchBar";
import {useState} from "react";
import {Row} from "@/components/Row";
import {SortButton} from "@/components/SortButton";
import {RootView} from "@/components/RootView";

export default function Index() {
    const colors = useThemeColors()
    const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21')
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<"id" | "name">("id");
    const pokemons = data?.pages.flatMap(page => page.results.map(r => ({name:r.name, id: getPokemonId(r.url)}))) ?? []
    const filteredPokemons = [...(search ?
        pokemons.filter(pokemon =>
            pokemon.name.includes(search.toLowerCase()) ||
            pokemon.id.toString() === search)
        : pokemons),
    ].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    return (
        <RootView>
            <Row style={styles.header} gap={16}>
                <Image source={require("@/assets/images/pokeball.png")} style={{width: 24, height: 24}}/>
                <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
            </Row>
            <Row style={styles.search}>
                <SearchBar value={search} onChange={setSearch}/>
                <SortButton value={sortKey} onChange={setSortKey}></SortButton>
            </Row>
            <Card style={styles.body}>
                <FlatList
                    data={filteredPokemons}
                    numColumns={3}
                    columnWrapperStyle={styles.gridGap}
                    contentContainerStyle={[styles.gridGap, styles.list]}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color={colors.tint}/> : null
                    }
                    onEndReached={ search ? undefined : () => fetchNextPage()}
                    renderItem={({item}) =>
                    <PokemonCard id={item.id} name={item.name} style={{flex:1/3, height:100}}/>} keyExtractor={(item) => item.id.toString()}
                />
            </Card>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header:{
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    body:{
        flex: 1,
        marginTop: 16
    },
    gridGap:{
        gap: 8,
        padding:4,
    },
    list:{
        padding: 12,
    },
    search:{
        gap: 16,
        paddingHorizontal: 12
        // padding: 12,
    }
})



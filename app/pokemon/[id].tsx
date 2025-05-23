import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import {useLocalSearchParams, router} from "expo-router";
import {RootView} from "@/components/RootView";
import {Row} from "@/components/Row";
import {ThemedText} from "@/components/ThemedText";
import {useFetchQuery} from "@/hooks/useFetchQuery";
import {Colors} from "@/constants/Colors";
import {getPokemonArtwork} from "@/functions/pokemon";
import {Card} from "@/components/Card";

export default function Pokemon() {

    const colors = useLocalSearchParams();
    const params = useLocalSearchParams() as {id: string}
    const { data:pokemon } = useFetchQuery("/pokemon/[id]", {id: params.id})
    const mainType = pokemon?.types[0].type.name;
    const colorType = mainType ? Colors.type[mainType] : colors.tint;

    return (
        <RootView style={{ backgroundColor: colorType}}>
           <View>
               <Image source={require('@/assets/images/pokeball-big.png')} style={[styles.pokeball, {width: 208, height: 208}]}/>
               <Row style={[styles.header]}>
                   <Row gap={8}>
                       <Pressable onPress={router.back}>
                           <Image source={require("@/assets/images/back.png")} style={{width: 32, height: 32}}/>
                       </Pressable>
                       <ThemedText color="grayWhite" variant="headline">{pokemon?.name}</ThemedText>
                   </Row>
                   <ThemedText color="grayWhite" variant="subtitle2">
                       #{params.id.padStart(3, '0')}
                   </ThemedText>
               </Row>

               <Card style={[styles.body]}>
                   <Image
                       source={{uri: getPokemonArtwork(params.id)}}
                       style={[styles.artwork, {width: 200, height: 200}]}
                   />
                     <ThemedText>Types</ThemedText>
               </Card>
               <Text>Pokemon {params.id}</Text>
           </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header:{
        margin: 20,
        justifyContent: "space-between",
    },
    pokeball:{
        opacity: 0.1,
        position: "absolute",
        right: 8,
        top: 0,
    },
    artwork:{
        position: "absolute",
        top: -140,
        alignSelf: "center"
    },
    body:{
        marginTop: 144,
        paddingHorizontal:20,
        paddingTop: 60,
    }
})

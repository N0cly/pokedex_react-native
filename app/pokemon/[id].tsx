import { View , Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function Pokemon() {

    const params = useLocalSearchParams()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit {params.id} to edit this screen.</Text>
    </View>
  );
}

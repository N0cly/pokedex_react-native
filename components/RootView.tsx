import {StyleSheet, ViewProps} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useThemeColors} from "@/hooks/useThemeColors";

type Props = ViewProps

export function RootView ({style, ...rest}: Props){
    const colors = useThemeColors()

    return (
        <SafeAreaView style={[rootStyle.container, {backgroundColor: colors.tint}, style]} {...rest}/>
    )
}


const rootStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    }
})
import {Image, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors";
import {useState} from "react";
import {ThemedText} from "@/components/ThemedText";
import {Card} from "@/components/Card";
import {Row} from "@/components/Row";

type Props = {
    value: "id" | "name",
    onChange: (v: "id" | "name") => void,
};

export function SortButton({value, onChange}: Props){

    const colors = useThemeColors();
    const [isModalVisible, setModalVisibility] = useState(false);
    const onButtonPress = () => {
        setModalVisibility(true);
    }
    const onClose = () => {
        setModalVisibility(false);
    }
    const options = [
        {label: "Number", value: "id"},
        {label: "Name", value: "name"},
    ]

    return (
        <>

            <Pressable onPress={onButtonPress}>
                <View style={[styles.button, {backgroundColor: colors.grayWhite}]}>
                    <Image source={value === "id" ?
                        require("@/assets/images/sort_tag.png")
                        : require("@/assets/images/sort_name.png")
                    } style={{width: 14, height: 14}}/>
                </View>
            </Pressable>
            <Modal
                transparent={true}
                visible={isModalVisible} onRequestClose={onClose}>
                <Pressable style={styles.backdrop} onPress={onClose}/>
                <View style={[styles.popup, {backgroundColor: colors.tint}]}></View>
                <ThemedText
                    style={styles.title}
                    variant="subtitle2"
                    color="grayWhite">
                    Sort by
                </ThemedText>
                <Card style={styles.card}>
                    {options.map((o) => (
                        <Row key={o.value}>
                            <View/>
                            <ThemedText>{o.label}</ThemedText>
                        </Row>
                    ))}
                </Card>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    popup: {
        padding: 4,
        paddingTop: 16,
        gap: 16,
        borderRadius: 12,
    },
    title:{
        paddingLeft: 20,
    },
    card:{
        paddingHorizontal:20,
        paddingVertical: 16,
        gap: 16,
    }
});
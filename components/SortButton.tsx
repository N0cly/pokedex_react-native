import {Dimensions, Image, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors";
import {useRef, useState} from "react";
import {ThemedText} from "@/components/ThemedText";
import {Card} from "@/components/Card";
import {Row} from "@/components/Row";
import {Radio} from "@/components/Radio";
import {Shadows} from "@/constants/Shadows";

type Props = {
    value: "id" | "name",
    onChange: (v: "id" | "name") => void,
};

export function SortButton({value, onChange}: Props){

    const buttonRef = useRef<View>(null);
    const colors = useThemeColors();
    const [isModalVisible, setModalVisibility] = useState(false);
    const [position, setPosition] = useState<null | {top: number, right: number}>(null);
    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x - width,
            })
            setModalVisibility(true);
        })
    }
    const onClose = () => {
        setModalVisibility(false);
    }
    const options = [
        {label: "Number", value: "id"},
        {label: "Name", value: "name"},
    ] as const

    return (
        <>

            <Pressable onPress={onButtonPress}>
                <View ref={buttonRef} style={[styles.button, {backgroundColor: colors.grayWhite}]}>
                    <Image source={value === "id" ?
                        require("@/assets/images/sort_tag.png")
                        : require("@/assets/images/sort_name.png")
                    } style={{width: 14, height: 14}}/>
                </View>
            </Pressable>
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={isModalVisible}
                onRequestClose={onClose}>
                <Pressable style={styles.backdrop} onPress={onClose}/>
                <View style={[styles.popup, {backgroundColor: colors.tint, ...position}]}>
                    <ThemedText
                        style={styles.title}
                        variant="subtitle2"
                        color="grayWhite">
                        Sort by
                    </ThemedText>
                    <Card style={styles.card}>
                        {options.map((o) => (
                            <Pressable onPress={ () => onChange(o.value)}>
                                <Row key={o.value} gap={8}>
                                    <Radio checked={o.value === value}/>
                                    <ThemedText>{o.label}</ThemedText>
                                </Row>
                            </Pressable>
                        ))}
                    </Card>
                </View>
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
        position: "absolute",
        width: 113,
        padding: 4,
        paddingTop: 16,
        gap: 16,
        borderRadius: 12,
        ...Shadows.dp2
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
import React from "react";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { View, StyleSheet } from "react-native";

const Skeleton1 = () => {
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;

    return (
        <View style={{ flex: 1, backgroundColor: "#16181a" }}>
            <View style={{ flex: 1, backgroundColor: "#16181a", width: 300, margin: 20 }}>
                <MotiView
                    transition={{ type: "spring", duration: 10000, damping: 100, repeatReverse: false }}
                    style={[styles.container, styles.padded]}
                    animate={{ backgroundColor: "#16181a" }}
                >
                    {/* Apply background and highlightColor directly on Skeleton */}
                    <Skeleton
                        backgroundColor="black"
                        highlightColor="#444" // Set highlight color here
                        radius={20}
                        height={200}
                        width={"100%"}
                    />
                    <Spacer />
                    <Skeleton
                        colorMode="dark"
                        radius={30}
                        width={"100%"}
                        height={15}
                        backgroundColor="black"
                        highlightColor="#666" // Set highlight color for this skeleton
                    />
                    <Spacer height={8} />
                    <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                        <Skeleton
                            colorMode="dark"
                            width={20}
                            height={20}
                            radius={"round"}
                            backgroundColor="black"
                            highlightColor="#333" // Set highlight color
                        />
                        <Spacer height={8} />
                        <Skeleton
                            colorMode="dark"
                            width={"92%"}
                            height={18}
                            backgroundColor="black"
                            highlightColor="#333" // Set highlight color
                        />
                    </View>
                </MotiView>
            </View>
        </View>
    );
};

export default Skeleton1;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "black",
        paddingVertical: 20,
        paddingBottom: 100,
    },
});


import React, { useCallback, useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useFocusEffect } from "expo-router"; // or "react-navigation" if using react-navigation
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

function Upvotedata() {

    async function getData1() {
        try {
            const response = await fetch(
                `${url}notification/getUserNotifiation`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();

            console.log(result);

            // console.log(result.data.totalUpvotes);
            // console.log(result.data.upvotesPerDay);
            // console.log(result.data.investorUpvotes);

            // setstatistic(result.data)

            // console.log(result.data[0].investor.roleId.user_id.profilePhoto);
            // console.log(result.data[0].investor.roleId.user_id.userName);
            // console.log(result.data[0].investor.roleId.user_id.role);
            // console.log(result.data[0].investor.roleId.previousExperience);
            // console.log(result.data[0].requestDate);

        } catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }
    }

    useFocusEffect(

        useCallback(() => {
            if (token) {
                setloading(true)
                getData1();
            }
            return () => {
                // If you need to abort the fetch or cleanup, do it here.
                // Example: controller.abort() if you are using AbortController
              };
        }, [token])
    );


    return (
        <ScrollView
            //  refreshControl={}
            style={{ flex: 1, backgroundColor: "#16181a" }}>
            <View style={styles.container1}>
                <View style={styles.textbox}>
                    <Text style={styles.t1}>{statistic.totalUpvotes}</Text>
                    <Text style={styles.t2}>Total UpVotes</Text>
                </View>
                <View style={styles.textbox}>
                    <Text style={styles.t1}>{statistic.upvotesPerDay}</Text>
                    <Text style={styles.t2}>Today </Text>
                </View>
                <View style={styles.textbox}>
                    <Text style={styles.t1}>{statistic.investorUpvotes}</Text>
                    <Text style={styles.t2}>By Investors </Text>
                </View>
            </View>
            <View style={styles.divider}></View>


            <View
                style={styles.box1}>
                <View style={styles.left}>


                    <Image style={styles.topimage} source={require("../../assets/images/p2.png")} />
                    <View style={styles.bottominfo1}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Text style={styles.topu1}>tagg <Text style={styles.topu2}>founder</Text> <View style={styles.circle}></View> <AutoSizeText
                                numberOfLines={1}
                                fontSize={12}
                                mode={ResizeTextMode.max_lines}
                                ellipsizeMode='tail'
                                style={styles.time}>createdAt
                            </AutoSizeText>

                            </Text>
                            {/* <Text style={styles.time}>{time(item.taggedUser.createdAt)}</Text> */}


                        </View>
                        <Text style={styles.sub2}>lorem</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Image style={styles.image1} source={require("../../assets/images/p2.png")} />
                </View>
            </View>


        </ScrollView>

    )
}


export default Upvotedata
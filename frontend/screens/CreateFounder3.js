/*import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CreateFounder3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.createAccountFounder5}>
      <View style={styles.createAccountFounder5Child} />
      <View style={styles.icons}>
        <Pressable
          style={[styles.icon, styles.iconLayout]}
          onPress={() => navigation.navigate("CreateAccountFounder2")}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
           // source={require("../assets/icon.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.expandLeft, styles.iconLayout]}
          onPress={() => navigation.navigate("CreateAccountFounder")}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
           // source={require("../assets/icons.png")}
          />
        </Pressable>
      </View>
      <View style={[styles.socialProof, styles.startupPosition]}>
        <Text style={styles.socialProof1}>Social proof</Text>
        <Text style={[styles.url, styles.urlTypo]}>URL</Text>
        <View style={[styles.socialProofChild, styles.childLayout]} />
        <Image
          style={styles.plus02Icon}
          contentFit="cover"
         // source={require("../assets/plus02.png")}
        />
      </View>
      <View style={[styles.fundingStatus, styles.startupPosition]}>
        <View style={[styles.number, styles.numberPosition]}>
          <View style={styles.numberChild} />
          <Text style={styles.thousand}>2 thousand</Text>
        </View>
        <Text style={[styles.indicateTheAmount, styles.textTypo1]}>
          Indicate the amount of funding your startup has received so far. This
          information will only be visible to verified investors and helps them
          assess your startup's financial backing and growth potential.
        </Text>
        <Text style={styles.socialProof1}>Funding Status</Text>
        <Image
          style={styles.barIcon}
          contentFit="cover"
          source={require("../assets/group-34.png")}
        />
      </View>
      <View style={[styles.startupStage, styles.startupPosition]}>
        <View style={styles.dropdown2}>
          <View style={[styles.dropdown2Child, styles.childBorder]} />
          <Text style={[styles.select, styles.selectTypo]}>Select</Text>
          <Image
            style={[styles.chevronDownIcon, styles.chevronIconLayout]}
            contentFit="cover"
            //source={require("../assets/chevrondown1.png")}
          />
        </View>
        <Text style={[styles.identifyWhereYour, styles.yourTypo]}>
          Identify where your startup is in its journey—whether you’re in
          ideation, have a prototype, or are generating revenue.
        </Text>
        <Text style={styles.socialProof1}>{`Startup stage `}</Text>
      </View>
      <View style={[styles.startupSector, styles.startupPosition]}>
        <View style={[styles.dropdown1, styles.chevronIconLayout]}>
          <View style={[styles.dropdown1Child, styles.chevronIconLayout]} />
          <Text style={[styles.select1, styles.selectTypo]}>Select</Text>
          <Image
            style={[styles.chevronDownIcon1, styles.chevronIconLayout]}
            contentFit="cover"
           // source={require("../assets/chevrondown1.png")}
          />
        </View>
        <Text style={[styles.defineYourStartups, styles.yourTypo]}>
          Define your startup’s focus: horizontal sectors serve multiple
          industries, while vertical sectors target a specific niche.
        </Text>
        <Text style={styles.socialProof1}>{`Startup sector `}</Text>
      </View>
      <View style={[styles.aboutStartup, styles.startupPosition]}>
        <View style={[styles.description, styles.descriptionLayout]}>
          <View style={[styles.description1, styles.descriptionLayout]}>
            <Text style={[styles.text, styles.textTypo1]}>0/1000</Text>
          </View>
          <Text style={[styles.description2, styles.urlTypo]}>
            Description:
          </Text>
        </View>
        <View style={[styles.goal, styles.descriptionLayout]}>
          <View style={[styles.goalChild, styles.childLayout]} />
          <Text style={[styles.description2, styles.urlTypo]}>Goal</Text>
        </View>
        <View style={[styles.name, styles.descriptionLayout]}>
          <View style={[styles.goalChild, styles.childLayout]} />
          <Text style={[styles.description2, styles.urlTypo]}>Name</Text>
        </View>
        <Text style={styles.socialProof1}>About Startup/Organisation</Text>
      </View>
      <View style={[styles.progressBar, styles.startsy54Layout]}>
        <View style={[styles.progressBarChild, styles.childLayout]} />
        <Image
          style={[styles.progressBarItem, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarInner, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.ellipseIcon, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarChild1, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarChild2, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <LinearGradient
          style={[styles.rectangleLineargradient, styles.progressChildPosition]}
          locations={[0, 1]}
          colors={["rgba(255, 255, 255, 0.6)", "rgba(153, 153, 153, 0.4)"]}
        />
        <Text style={[styles.text1, styles.textTypo]}>1</Text>
        <Text style={[styles.text2, styles.textTypo]}>2</Text>
        <Text style={[styles.text3, styles.textTypo]}>3</Text>
        <Text style={[styles.text4, styles.textTypo]}>4</Text>
        <Image
          style={[styles.startsy54, styles.startsy54Layout]}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
    </View>
  );
};*/
import * as React from "react";
import { StyleSheet, View, Pressable, Text, ScrollView, TextInput } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Icon } from "@rneui/themed";

const CreateFounder3 = () => {
  const navigation = useNavigation();

  const handleSliderChange = (value) => {
    setProgress(value);
  };

  const [name, setName] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [progress, setProgress] = React.useState(1);
  const [url, setUrl] = React.useState("");
  const[description, setDescription] = React.useState("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.createAccountFounder5}>
        <View style={styles.createAccountFounder5Child} />
        <View style={styles.icons}>
          <Pressable
            style={[styles.icon, styles.iconLayout]}
            onPress={() => navigation.navigate("CreateFounder4")}
          >
            <Image
              style={styles.icon1}
              contentFit="cover"
              
              source={require("../assets/expand-right.png")}
            />
          </Pressable>
          <Pressable
            style={[styles.expandLeft, styles.iconLayout]}
            onPress={() => navigation.navigate("CreateFounder2")}
          >
            <Image
              style={styles.icon1}
              contentFit="cover"
    
            
              source={require("../assets/expand-left.png")}
            />
          </Pressable>
        </View>
        <View style={[styles.socialProof, styles.startupPosition]}>
          <Text style={styles.socialProof1}>Social proof</Text>
        
          
          <Pressable>
          <TextInput
            style={[styles.url, styles.urlTypo]}
            placeholder="URL"
            value={url}
            onChangeText={(text) => setUrl(text)}
          />
          </Pressable>
          
          <View style={[styles.socialProofChild, styles.childLayout]} />
          <Image
            style={styles.plus02Icon}
            contentFit="cover"
            // source={require("../assets/plus02.png")}
          />
          
        </View>
        <View style={[styles.fundingStatus, styles.startupPosition]}>
          <View style={[styles.number, styles.numberPosition]}>
            <View style={styles.numberChild} />
            <Text style={styles.thousand}>{Math.round(progress)}</Text>
            
        
          </View>
          <Text style={[styles.indicateTheAmount, styles.textTypo1]}>
            Indicate the amount of funding your startup has received so far.
            This information will only be visible to verified investors and
            helps them assess your startup's financial backing and growth
            potential.
          </Text>
          <Text style={styles.socialProof1}>Funding Status</Text>
          
            <Slider
          style={[styles.slider,styles.barIcon]}
          minimumValue={1000}
          maximumValue={1000000}
          step={1}
          value={progress}
          onValueChange={handleSliderChange}
          thumbTintColor="white"
          minimumTrackTintColor="#00DE62"
          maximumTrackTintColor="white"
        />
         
        </View>
        <View style={[styles.startupStage, styles.startupPosition]}>
          <View style={styles.dropdown2}>
            <View style={[styles.dropdown2Child, styles.childBorder]} />
            <Text style={[styles.select, styles.selectTypo]}>Select</Text>
            <Image
              style={[styles.chevronDownIcon, styles.chevronIconLayout]}
              contentFit="cover"
              // source={require("../assets/chevrondown1.png")}
            />
          </View>
          <Text style={[styles.identifyWhereYour, styles.yourTypo]}>
            Identify where your startup is in its journey—whether you’re in
            ideation, have a prototype, or are generating revenue.
          </Text>
          <Text style={styles.socialProof1}>{`Startup stage `}</Text>
        </View>
        <View style={[styles.startupSector, styles.startupPosition]}>
          <View style={[styles.dropdown1, styles.chevronIconLayout]}>
            <View style={[styles.dropdown1Child, styles.chevronIconLayout]} />
            <Text style={[styles.select1, styles.selectTypo]}>Select</Text>
            <Image
              style={[styles.chevronDownIcon1, styles.chevronIconLayout]}
              contentFit="cover"
              // source={require("../assets/chevrondown1.png")}
            />
          </View>
          <Text style={[styles.defineYourStartups, styles.yourTypo]}>
            Define your startup’s focus: horizontal sectors serve multiple
            industries, while vertical sectors target a specific niche.
          </Text>
          <Text style={styles.socialProof1}>{`Startup sector `}</Text>
        </View>
        <View style={[styles.aboutStartup, styles.startupPosition]}>
          <View style={[styles.description, styles.descriptionLayout]}>
            <View style={[styles.description1, styles.descriptionLayout]}>
              <Text style={[styles.text, styles.textTypo1]}>0/1000</Text>
              <TextInput
            style={[styles.description2, styles.urlTypo]}
            placeholder="write here"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
            </View>
            <Text style={[styles.description2, styles.urlTypo]}>
              Description:
            </Text>
          
          </View>
          <View style={[styles.goal, styles.descriptionLayout]}>
            <View style={[styles.goalChild, styles.childLayout]} />
            <TextInput
            style={[styles.description2, styles.urlTypo]}
            placeholder="Goal"
            value={goal}
            onChangeText={(text) => setGoal(text)}
          />
            
          </View>
          <View style={[styles.name, styles.descriptionLayout]}>
            <View style={[styles.goalChild, styles.childLayout]} />
            <TextInput
            style={[styles.description2, styles.urlTypo]}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
            
          </View>
          <Text style={styles.socialProof1}>
            About Startup/Organisation
          </Text>
        </View>
        <View style={[styles.progressBar, styles.startsy54Layout]}>
          <View style={[styles.progressBarChild, styles.childLayout]} />
          <Image
            style={[styles.progressBarItem, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressBarInner, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressBarChild1, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressBarChild2, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <LinearGradient
            style={[styles.rectangleLineargradient, styles.progressChildPosition]}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.6)", "rgba(153, 153, 153, 0.4)"]}
          />
          <Text style={[styles.text1, styles.textTypo]}>1</Text>
          <Text style={[styles.text2, styles.textTypo]}>2</Text>
          <Text style={[styles.text3, styles.textTypo]}>3</Text>
          <Text style={[styles.text4, styles.textTypo]}>4</Text>
          <Image
            style={[styles.startsy54, styles.startsy54Layout]}
            contentFit="cover"
            source={require("../assets/startsy-5-3.png")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: 76,
    top: 0,
    height: 76,
    position: "absolute",
  },
  startupPosition: {
    left: 26,
    position: "absolute",
  },
  urlTypo: {
    textAlign: "left",
    color: Color.colorSilver_200,
    fontFamily: FontFamily.sansSerifCollection,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  childLayout: {
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
    position: "absolute",
  },
  numberPosition: {
    left: 14,
    width: 280,
  },
  textTypo1: {
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
    position: "absolute",
    height:450
  },
  childBorder: {
    borderRadius: Border.br_3xs,
    borderWidth: 3,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    left: 0,
  },
  selectTypo: {
    color: Color.colorDarkgray_200,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    position: "absolute",
  },
  chevronIconLayout: {
    height: 47,
    position: "absolute",
  },
  yourTypo: {
    height: 68,
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    left: 26,
    position: "absolute",
  },
  descriptionLayout: {
    width: 284,
    position: "absolute",
  },
  startsy54Layout: {
    height: 83,
    position: "absolute",
  },
  progressChildPosition: {
    height: 12,
    top: 34,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_mini,
    top: 28,//48
    color: Color.colorSpringgreen_200,
    textAlign: "left",
    position: "absolute",
  },
  createAccountFounder5Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    width: 360,
    height: 1249,
    backgroundColor: Color.colorGray_100,
    left: 0,
    position: "absolute",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  icon: {
    left: 267,
  },
  expandLeft: {
    left: 0,
  },
  icons: {
    top: 1256,
    left: 7,
    width: 343,
    height: 76,
    position: "absolute",
  },
  socialProof1: {
    color: Color.colorGainsboro,
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    lineHeight: 24,
    fontSize: FontSize.size_5xl,
    top: 0,
    left: 0,
    position: "absolute",
  },
  url: {
    top: 25,
    left: 23,
  },
  socialProofChild: {
    top: 67,
    left: 11,
    width: 287,
    borderColor: Color.colorGray_200,
    height: 3,
    borderTopWidth: 3,
  },
  plus02Icon: {
    top: 35,
    left: 263,
    width: 28,
    height: 28,
    position: "absolute",
  },
  socialProof: {
    top: 1162,
    width: 296,
    height: 74,
  },
  numberChild: {
    borderRadius: Border.br_xl,
    borderWidth: 3,
    height: 49,
    width: 280,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    top: 0,
    backgroundColor: Color.colorGray_100,
    left: 0,
    position: "absolute",
  },
  thousand: {
    left: 53,
    width: 163,
    color: Color.colorSpringgreen_200,
    top: 19,
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    lineHeight: 26,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  number: {
    top: 125,
    height: 49,
    width: 280,
    position: "absolute",
  },
  indicateTheAmount: {
    height: 75,
    width: 264,
    fontSize: FontSize.size_smi,
    top: 24,
    fontFamily: FontFamily.robotoRegular,
    left: 26,
  },
  barIcon: {
    top: 195,
    width: 285,
    height: 20,
    left: 12,
    position: "absolute",
  },
  fundingStatus: {
    top: 916,
    width: 297,
    height: 215,
  },
  dropdown2Child: {
    height: 49,
    width: 280,
    top: 0,
    backgroundColor: Color.colorGray_100,
    position: "absolute",
  },
  select: {
    top: 5,
    left: 13,
  },
  chevronDownIcon: {
    top: 2,
    left: 234,
    width: 47,
    height: 47,
  },
  dropdown2: {
    width: 281,
    top: 89,
    left: 12,
    height: 49,
    position: "absolute",
  },
  identifyWhereYour: {
    top: 32,
    width: 264,
  },
  startupStage: {
    top: 745,
    width: 293,
    height: 138,
  },
  dropdown1Child: {
    borderRadius: Border.br_3xs,
    borderWidth: 3,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    left: 0,
    width: 280,
    top: 0,
    backgroundColor: Color.colorGray_100,
  },
  select1: {
    top: 4,
    left: 16,
    width: 80,
    height: 37,
  },
  chevronDownIcon1: {
    left: 233,
    width: 47,
    height: 47,
    top: 0,
  },
  dropdown1: {
    top: 89,
    width: 280,
    left: 14,
  },
  defineYourStartups: {
    top: 20,
    width: 232,
  },
  startupSector: {
    top: 579,
    width: 294,
    height: 136,
  },
  text: {
    top: 169,
    left: 227,
    fontSize: FontSize.size_sm,
    width: 46,
    height: 16,
  },
  description1: {
    top: 45,
    height: 194,
    borderRadius: Border.br_3xs,
    borderWidth: 3,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    left: 0,
    overflow: "hidden",
  },
  description2: {
    left: 10,
    top: 0,
  },
  description: {
    top: 141,
    height: 239,
    left: 12,
  },
  goalChild: {
    top: 44,
    width: 287,
    borderColor: Color.colorGray_200,
    height: 3,
    borderTopWidth: 3,
    left: 0,
  },
  goal: {
    top: 88,
    left: 12,
    height: 49,
  },
  name: {
    top: 33,
    left: 12,
    height: 49,
  },
  aboutStartup: {
    top: 170,
    width: 310,
    height: 380,
  },
  progressBarChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    width: 222,
    height: 3,
    borderTopWidth: 3,
  },
  progressBarItem: {
    width: 12,
    height: 12,
    left: 90,
  },
  progressBarInner: {
    left: 145,
    width: 12,
    height: 12,
  },
  ellipseIcon: {
    left: 200,
    width: 12,
    height: 12,
  },
  progressBarChild1: {
    left: 255,
    width: 12,
    height: 12,
  },
  progressBarChild2: {
    left: 310,
    width: 12,
    height: 12,
  },
  rectangleLineargradient: {
    borderRadius: Border.br_11xl,
    borderColor: Color.colorGray_100,
    borderWidth: 0.2,
    width: 177,
    backgroundColor: "transparent",
    left: 90,
    height: 12,
    borderStyle: "solid",
  },
  text1: {
    left: 148,
  },
  text2: {
    left: 202,
  },
  text3: {
    left: 257,
  },
  text4: {
    left: 311,
  },
  startsy54: {
    width: 83,
    top: 0,
    left: 0,
  },
  progressBar: {
    width: 322,
    left: 12,
    top: 16,
    height: 83,
  },
  createAccountFounder5: {
    backgroundColor: Color.colorGray_200,
    flex: 1,
    height: 1344,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateFounder3;

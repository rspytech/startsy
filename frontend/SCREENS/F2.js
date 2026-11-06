import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View , TextInput,StyleSheet } from 'react-native';
const F2 = () => {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Type here" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default F2


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "red"
    }
})

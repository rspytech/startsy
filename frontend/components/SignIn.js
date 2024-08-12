import React, { memo } from "react";

const SignIn = memo(() => {
  return (
    <Image
      style={styles.signInIcon}
      contentFit="cover"
      source={require("../assets/sign-in1.png")}
    />
  );
});

const styles = StyleSheet.create({
  signInIcon: {
    width: 43,
    height: 43,
  },
});

export default SignIn;

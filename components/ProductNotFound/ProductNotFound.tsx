import React from 'react';
import {StyleSheet, View} from 'react-native';

import LottieView from 'lottie-react-native';

import {Button} from 'react-native-paper';

const GO_BACK = 'Go Back';

type Props = {
  goBack?: () => void;
};
export const ProductNotFound: React.FC<Props> = ({goBack}) => {
  return (
    <View style={styles.content}>
      <View style={styles.contentContainer}>
        <LottieView
          style={styles.lottie}
          source={require('../../assets/animation_lmp0jez8.json')}
          autoPlay
          loop
        />
        {goBack !== undefined ? (
          <Button mode="contained" onPress={goBack} style={styles.button}>
            {GO_BACK}
          </Button>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
  contentContainer: {
    width: 300,
    height: 220,
    alignSelf: 'center',
  },
});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {ProductNotFound} from '../../../../components';

type Props = {
  loading: boolean;
};
export const ListEmptyComponent: React.FC<Props> = ({loading}) => {
  if (!loading) {
    return <ProductNotFound />;
  }

  return (
    <View style={styles.content}>
      <View style={styles.contentContainer}>
        <LottieView
          style={styles.lottie}
          source={require('../../../../../assets/loading.json')}
          autoPlay
          loop
        />
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
  contentContainer: {
    width: 300,
    height: 220,
    alignSelf: 'center',
  },
});

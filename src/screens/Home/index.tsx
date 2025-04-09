import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSampleStore} from '../../store/useSampleStore';
import {navigate} from '../../navigators/navigation-services';
import {APP_SCREEN} from '../../navigators/screen-type';

export const HomeScreen: React.FC = () => {
  const {count, actions: sampleActions} = useSampleStore(state => state);
  return (
    <View style={styles.container}>
      <Button title="decrease" onPress={() => sampleActions.decrease()} />
      <Text>{count}</Text>
      <Button title="increase" onPress={() => sampleActions.increase()} />
      <View style={{marginTop: 100}}>
        <Button
          title="Go to Profile screen"
          onPress={() => navigate(APP_SCREEN.PROFILE)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
});

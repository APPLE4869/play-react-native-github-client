import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/screens/HomeScreen';
import DetailScreen from './components/screens/DetailScreen';

const Navigator = createStackNavigator ({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
    },
  },
    Detail: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.item.name
    }),
  },
});

export default Navigator;

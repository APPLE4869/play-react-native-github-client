import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

type Props = {};
export default class DetailScreen extends Component<Props> {
  render() {
    const { item } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.fullName}>{item.full_name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }} />
          <Text style={styles.ownerName}>{item.owner.login}</Text>
        </View>
        <Text>{item.description}</Text>
        <Text style={styles.repoUrl}>{item.url}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14,
  },
  repoUrl: {
    marginTop: 10,
    marginBottom: 10,
  },
});

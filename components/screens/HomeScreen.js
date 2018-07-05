import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  AppState,
} from 'react-native';

type Props = {};
export default class HomeScreen extends Component<Props> {
  state = {
    items: [],
    refreshing: false,
    text: '',
  }
  page = 0;

  _keyExtractor = (item, index) => item.id;

  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1;
    fetch(`https://api.github.com/search/repositories?q=${this.state.text}&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;
        if (refreshing) {
          this.setState({ items, refreshing: false });
        } else {
          this.setState({ items: [...this.state.items, ...items] });
        }
      });
  }

  navigateToDetail(item) {
    this.props.navigation.navigate('Detail', { item });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.onChangeState)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onChangeState)
  }

  onChangeState = (appState) => {
    if (appState === 'active') {
      this.fetchRepositories(true);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({text: text})} />
          <TouchableOpacity onPress={() => this.fetchRepositories(true)}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.items}
          renderItem={({ item }) =>
            <TouchableOpacity style={{padding: 10}} onPress={() => this.navigateToDetail(item)}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{ item.name }</Text>

              <View style={{flexDirection: 'row'}}>
                <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }} />
                <Text style={styles.ownerName}>{item.owner.login}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={this._keyExtractor}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
          onRefresh={() => this.fetchRepositories(true)}
          refreshing={this.state.refreshing}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  inputWrapper: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EEE',
  },
  searchText: {
    padding: 10,
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
});

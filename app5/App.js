import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import api from './src/services/api';

import Filmes from './src/Filmes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmes: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const response = await api.get('r-api/?api=filmes');
    this.setState({
      filmes: response.data,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      //coloca o efeito "carregando" enquanto aguarda a reinderização
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color="#09A6FF" size={40} />
        </View>
      );
    } else {
      //reinderiza os componentes
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.filmes}
            keyExtractor={item => item.id.toString()} //convertendo id emstring
            renderItem={({item}) => <Filmes data={item} />} //paser component
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;

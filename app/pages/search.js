import * as React from 'react';
import { SearchBar, Header, Divider} from 'react-native-elements';
import {View} from 'react-native';



export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View>

        <View>
          <Header
              leftComponent={{ icon: 'menu', size: 30, color: '#fff', onPress:() => this.props.navigation.toggleDrawer() }}
              centerComponent={{ text: 'Search', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
              backgroundColor='black'
          />
        
          <SearchBar
            round
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>

      </View>
    );
  }
}
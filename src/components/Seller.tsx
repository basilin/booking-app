import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';

export const Seller = ({navigation}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getSellers();
  }, []);

  const Item = ({seller}: {seller: any}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DateSelection', {sellerId: seller._id})
      }>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{seller.name}</ListItem.Title>
          <ListItem.Subtitle>{seller.location}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  const renderItem = ({item}: {item: any}) => <Item seller={item} />;

  const getSellers = async () => {
    const result = await axios.get('http://localhost:3333/seller');
    setData(result.data);
  };

  const searchFilterFunction = async (e: any) => {
    setSearch(e);
    const result = await axios.get(`http://localhost:3333/seller/search/${e}`);
    setData(result.data);
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  const renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => searchFilterFunction(text)}
        autoCorrect={false}
        value={search}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={x => x._id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

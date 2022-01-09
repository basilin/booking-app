import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import axios from 'axios';
import * as _ from 'lodash';

export const Appointment = ({route, navigation}) => {
  const [slots, setSlots] = useState([]);
  const {sellerId, day} = route.params;
  useEffect(() => {
    getSlots();
  }, []);
  const getSlots = async () => {
    const url = `http://localhost:3333/appointment-slot?sellerId=${sellerId}&date=${day.dateString}`;
    const result = await axios.get(url);
    setSlots(result.data);
  };
  const bookAppointment = async (slot: any) => {
    const userRes = await axios.get('http://localhost:3333/user');
    const user: any = _.head(userRes.data);
    const appointment = {
      date: day.dateString,
      sellerId,
      status: 1,
      userId: user._id,
      slotId: slot.id,
    };
    console.log(appointment);
    await axios.post('http://localhost:3333/appointment', appointment);
    await getSlots();
  };
  const Item = ({slot}: {slot: any}) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{slot.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.ButtonGroup
        disabled={slot.hasAppointment}
        buttons={['Book']}
        onPress={index => bookAppointment(slot)}
      />
    </ListItem>
  );
  const renderItem = ({item}: {item: any}) => <Item slot={item} />;
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
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={slots}
        keyExtractor={x => x.id}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

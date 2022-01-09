import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

export const DateSelection = ({route, navigation}) => {
  const {sellerId} = route.params;
  const daySelected = day => {
    console.log(sellerId, day);
    navigation.navigate('Appointment', {sellerId, day});
  };
  return (
    <View style={{flex: 1}}>
      <Calendar
        minDate={new Date().toDateString()}
        onDayPress={daySelected}
        hideExtraDays={true}
      />
    </View>
  );
};

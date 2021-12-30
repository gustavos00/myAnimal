import React, { useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';
import api from '../api/api';
import AuthContext from '../contexts/user';
import Constants from 'expo-constants';
import isEmpty from '../utils/isEmpty';

import { useNavigation } from '@react-navigation/core';
import { showError } from '../utils/error';
import { UserContextData } from '../interfaces/UserContextData';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';

import * as Notifications from 'expo-notifications';

function SplashScreen() {
  const navigation = useNavigation();
  const { setUserData, setAnimalDataGlobalFunction } = useContext(AuthContext);
  const [notificationPermissions, setNotificationPermissions] =
    useState<boolean>();

  //Check notification permissions
  const getNotificationsPermissions = async () => {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  };

  //Request notifications
  const requestNotificationPermissions = async () => {
    const response = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });

    return response.status === 'granted';
  };

  useEffect(() => {
    const getNotificationsPermissionsStatus = async () => {
      const response = await getNotificationsPermissions();
      setNotificationPermissions(response);

      if (!notificationPermissions) {
        //if dont have permissions
        const response = await requestNotificationPermissions();
        setNotificationPermissions(response);
      } else {
        //if have permissions
        if (Constants.isDevice) {
          //if have permissions
          try {
            const response = await Notifications.getExpoPushTokenAsync();
            console.log(response.data);
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('its not a device');
        }
      }
    };

    getNotificationsPermissionsStatus();
  }, []);

  //Check token on localstorage
  const getTokenFromLocalStorage = async () => {
    let accessResponse;
    let userData;

    try {
      accessResponse = await storage.load({ key: '@userAccess' });
    } catch (e) {
      console.log(e);
      return false;
    }

    if (!!accessResponse) {
      const { salt, token } = accessResponse;

      //API request
      let tokenData = new URLSearchParams();
      tokenData.append('salt', salt);
      tokenData.append('token', token);

      try {
        const response = await api.post('/user/access/verify', tokenData);
        userData = response.data as unknown as UserContextData;
      } catch (e: any) {
        //Verify error type by docs https://github.com/sunnylqm/react-native-storage
        showError('Error: ' + e, 'Apparently there was an error, try again');

        return false;
      }

      setUserData(userData);
      setAnimalDataGlobalFunction(
        userData.animalData as Array<AnimalInfoParams>
      );

      const { userAddress } = userData;

      return { haveAddress: !isEmpty(userAddress), isValid: true };
    } else {
      return false;
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const response = await getTokenFromLocalStorage();

      if (!!response) {
        navigation.navigate('Home' as never, response as never);
      } else {
        navigation.navigate('Login' as any);
      }
    };

    getToken();
  }, []);
  return <></>;
}

export default SplashScreen;
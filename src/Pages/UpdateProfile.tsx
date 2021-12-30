import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { UserContextData } from '../interfaces/UserContextData';

import globalStyles from '../assets/styles/global';

import api from '../api/api';

import Background from '../components/Background';
import Button from '../components/Button';
import Footer from '../components/Footer';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import OptionHeader from '../components/OptionHeader';
import StyledInput from '../components/StyledInput';
import Underline from '../components/Underline';
import AuthContext from '../contexts/user';
import AddImage from '../components/AddPhoto';

function UpdateProfile() {
  const navigation = useNavigation();
  const { user, setUserData } = useContext(AuthContext);

  const [streetName, setStreetName] = useState<string | undefined>(
    user?.userAddress.streetName
  );
  const [doorNumber, setDoorNumber] = useState<string | undefined>(
    user?.userAddress.doorNumber
  );
  const [postalCode, setPostalCode] = useState<string | undefined>(
    user?.userAddress.postalCode
  );
  const [parish, setParish] = useState<string | undefined>(
    user?.userAddress.parishName
  );
  const [locality, setLocality] = useState<string | undefined>(
    user?.userAddress.locationName
  );
  const [givenName, setGivenName] = useState<string | undefined>(
    user?.givenName
  );
  const [familyName, setFamilyName] = useState<string | undefined>(
    user?.familyName
  );
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    user?.phoneNumber
  );
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(user?.photoUrl);

  const handleSubmitForm = async () => {
    const newUserData = new FormData();
    newUserData.append('streetName', streetName ?? '');
    newUserData.append('doorNumber', doorNumber ?? '');
    newUserData.append('postalCode', postalCode ?? '');
    newUserData.append('parish', parish ?? '');
    newUserData.append('locality', locality ?? '');
    newUserData.append('givenName', givenName ?? '');
    newUserData.append('familyName', familyName ?? '');
    newUserData.append('phoneNumber', phoneNumber ?? '');
    newUserData.append('email', user?.email ?? '');
    newUserData.append('userPhoto', {
      uri: photoUrl,
      name: 'userPhoto',
      type: 'image/png', // or your mime type what you want
    } as unknown as string | Blob);

    try {
      const response = await api.post('/user/update', newUserData);
      setUserData(response.data as unknown as UserContextData);
      navigation.navigate(
        'Home' as never,
        { haveAddress: true, isValid: true } as never
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage photoUrl={photoUrl} setProfilePhotoFunction={setPhotoUrl} />

        <Background heightSize={'75%'}>
          <KeyboardAvoidingWrapper>
            <View style={styles.container}>
              <View style={styles.firstInputContainer}>
                <OptionHeader text={'Account information'} />
                <StyledInput
                  handleChangeFunction={setGivenName}
                  text={givenName}
                  placeholder={'Given Name'}
                />
                <StyledInput
                  handleChangeFunction={setFamilyName}
                  text={familyName}
                  placeholder={'Family Name'}
                />
                <StyledInput
                  handleChangeFunction={setPhoneNumber}
                  text={phoneNumber}
                  placeholder={'Phone number'}
                />
              </View>

              <Underline />
              <View style={styles.inputsContainer}>
                <OptionHeader text={'Address information'} />
                <StyledInput
                  handleChangeFunction={setStreetName}
                  text={streetName}
                  placeholder={'Street name'}
                />
                <StyledInput
                  handleChangeFunction={setDoorNumber}
                  text={doorNumber}
                  placeholder={'Door number'}
                />
                <StyledInput
                  handleChangeFunction={setPostalCode}
                  text={postalCode}
                  placeholder={'Postal code'}
                />
                <StyledInput
                  handleChangeFunction={setParish}
                  text={parish}
                  placeholder={'Parish'}
                />
                <StyledInput
                  handleChangeFunction={setLocality}
                  text={locality}
                  placeholder={'Locality'}
                />
              </View>
              <Button text={'Save'} handleClick={handleSubmitForm} />
            </View>
          </KeyboardAvoidingWrapper>
        </Background>
      </View>

      <Footer wichActive={'settings'} />
    </>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    flex: 1,

    justifyContent: 'center',

    backgroundColor: globalStyles.mainColor,
  },

  firstInputContainer: {
    width: '80%',
    marginTop: 40,
  },

  inputsContainer: {
    width: '80%',
    marginTop: 20,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpdateProfile;

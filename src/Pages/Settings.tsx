import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';
import { deleteStorageItem } from '../utils/localStorage';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SettingsHeader from '../components/SettingsHeader';
import SettingsElement from '../components/SettingsElement';
import Underline from '../components/Underline'
import BottomModal from '../components/BottomModal';
import PinPaymentMethod from '../components/PinPaymentMethod';


function Settings() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settings'>>();
  const navigation = useNavigation();

  const [securityModalOpen, setSecutiryModalOpen] = useState(false);


  const closeModal = () => {
    setSecutiryModalOpen(false);
  }

  const changeScreen = (screenName : string) => {
    navigation.navigate(screenName as any)
  }

  const clearUserLocalstorage = async () => {
    await deleteStorageItem('token')

    navigation.navigate('Login' as any)
  }
 
  return (
    <>
      <Header name={params.name} image={params.photo}/>

      <Background>
        <>
          <BackgroundHeader text={'Settings'} />

          <View style={styles.textContainer}>
            <SettingsHeader text={'Account Settings'} /> 
            <SettingsElement handleClick={() => changeScreen('Home')} text={'Edit profile'}/>
            <SettingsElement handleClick={() => setSecutiryModalOpen(true)} text={'Payment Methods'}/>
            <SettingsElement handleClick={async () => await clearUserLocalstorage()} text={'Log-out'}/>
          </View>

          <Underline />

          <View style={styles.textContainer}>
            <SettingsHeader text={'More'} /> 
            <SettingsElement handleClick={() => changeScreen('Home')} text={'About us'}/>
            <SettingsElement handleClick={() => changeScreen('Home')} text={'Privacy Policy'}/>
          </View>
          
        </>        
      </Background>

      <Footer />

      { securityModalOpen &&
          <BottomModal swipeDownFunction={closeModal} modalHeight={430}>
            <PinPaymentMethod />
          </BottomModal>
      }
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 55,
    marginRight: 55,
    marginTop: 20,
  },
})

export default Settings;

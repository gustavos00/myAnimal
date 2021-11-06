import { useNavigation } from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import { View, StyleSheet} from 'react-native';
import { KeycodeInput } from 'react-native-keycode';

import api from '../../api/api'
import AuthContext from '../../contexts/user';

import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';

interface PinPaymentMethodProps {
  alreadyHavePin: boolean,
}

interface pinAuthProps {
  allow: boolean
}

function PinPaymentMethod({alreadyHavePin} : PinPaymentMethodProps) {
  const [pin, setPin] = useState<string>();
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  const handleSubmit = async (text: string) => {
    if(text.match(/^[0-9]+$/) == null) { //Verify if string just have numbers
      setPin('');
      return ;
    };

    if(alreadyHavePin) {
      const params = new URLSearchParams({
        token: token ?? "",
        pin: text ?? ""
      })
  
      const data = await api.post('/user/verify/pin', params) //API request | need to pass token
      const { allow } = data.data as unknown as pinAuthProps

      if(allow) {
        console.log('allow');
        navigation.navigate('PaymentMethod' as any)
      } else { 
        console.log('notAllow')
        setPin('')
      }
    }
  }

  return (
    <>
      <KeyboardAvoidingWrapper >
        <>
          <View style={styles.dotInputContainer}>
            <KeycodeInput 
              numeric={true}
              value={pin}
              onComplete={(e) => handleSubmit(e)}
              onChange={(e) => setPin(e)}
            />
          </View>
        </>
      </KeyboardAvoidingWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 55,
    marginRight: 55,
    marginTop: 20,
  },

  dotInputContainer: {
    flexDirection: 'row',
  }
})

export default PinPaymentMethod;

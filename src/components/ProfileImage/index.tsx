import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ProfileImageProps {
  widthSize?: number;
  heightSize?: number;
  photoUrl: string | undefined;
  statusMessage?: string;
}

function ProfileImage({
  widthSize,
  heightSize,
  photoUrl,
  statusMessage,
}: ProfileImageProps) {
  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            widthSize ? { width: widthSize } : { width: 190 },
            heightSize ? { height: heightSize } : { height: 190 },
          ]}
        >
          <Image style={styles.animalImage} source={{ uri: photoUrl }} />

          {statusMessage && (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.statusContainer}
              >
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    position: 'absolute',
    top: '7%',

    elevation: 100,
    zIndex: 1000,

    justifyContent: 'center',
    alignItems: 'center',
  },

  statusContainer: {
    width: 40,
    height: 40,

    position: 'absolute',
    bottom: -5,
    right: 25,

    borderRadius: 40,
    backgroundColor: 'red',
  },

  circle: {
    width: 190,
    height: 190,

    borderRadius: 100,
    backgroundColor: globalStyles.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '20%',
    height: '20%',
  },

  animalImage: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
});

export default ProfileImage;

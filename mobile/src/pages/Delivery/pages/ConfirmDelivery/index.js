import React, { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { setDeliveryData } from '~/store/modules/delivery/actions';
import { setStyle } from '~/store/modules/statusBar/actions';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  CameraContainer,
  TakePictureButton,
  ImageContainer,
  SendImageButton,
  CancelImageButton,
} from './styles';

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default function ConfirmDelivery() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const delivery = useSelector(state => state.delivery.delivery);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) dispatch(setStyle(true));
  }, [dispatch, isFocused]);

  async function takePicture(camera) {
    setLoading(true);
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);

    setImage({
      uri: data.uri,
      type: 'image/jpeg',
      name: `signature_${delivery.id}.jpg`,
    });

    setLoading(false);
  }

  const sendImage = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('file', image);
      const responseFile = await api.post('files', data);

      const responseOrder = await api.put(`deliveries/${delivery.id}/finish`, {
        signature_id: responseFile.data.id,
      });

      dispatch(setDeliveryData(responseOrder.data));

      navigation.goBack();
    } catch (err) {
      Alert.alert(
        `Houve um erro na sua requisição. Tente novamente mais tarde.`
      );
    } finally {
      setLoading(false);
    }
  };

  const renderImage = () => (
    <>
      <ImageContainer>
        <Image style={{ flex: 1 }} source={{ uri: image.uri }} />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <SendImageButton onPress={() => sendImage()}>
            {loading ? (
              <ActivityIndicator size="small" color="#0f0" />
            ) : (
              <Icon name="check" size={35} color="#0f0" />
            )}
          </SendImageButton>
          <CancelImageButton onPress={() => setImage(null)}>
            <Icon name="close" size={35} color="#f00" />
          </CancelImageButton>
        </View>
      </ImageContainer>
    </>
  );

  const renderCamera = () => {
    const PendingView = () => (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );

    return (
      <CameraContainer>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message:
              'Esse aplicativo usa a câmera para tirar fotos das assinaturas de entregas',
            buttonPositive: 'Permitir',
            buttonNegative: 'Cancelar',
          }}
        >
          {({ camera, status, _ }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <TakePictureButton onPress={() => takePicture(camera)}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Icon name="camera" size={35} color="#fff" />
                  )}
                </TakePictureButton>
              </View>
            );
          }}
        </RNCamera>
      </CameraContainer>
    );
  };

  return <Background>{image ? renderImage() : renderCamera()}</Background>;
}

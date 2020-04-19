import styled from 'styled-components/native';

import Card from '~/components/Card';

export const CameraContainer = styled(Card)`
  flex: 1;
  margin-bottom: 25px;
  background-color: black;
  border: 0;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
`;

export const ImageContainer = styled(Card)`
  flex: 1;
  background-color: #fff;
  margin-bottom: 15px;
`;

export const TakePictureButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 30px;
`;

export const SendImageButton = styled(TakePictureButton)`
  position: absolute;
  bottom: -10px;
  left: 50px;
`;

export const CancelImageButton = styled(TakePictureButton)`
  position: absolute;
  bottom: -10px;
  right: 50px;
`;

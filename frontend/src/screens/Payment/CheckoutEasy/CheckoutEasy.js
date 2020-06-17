import React from 'react';
import {Alert, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CardView} from 'react-native-credit-card-input';
import {addDays, format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../../services/api';
import {completeProfileRequest} from '../../../appStore/appModules/user/actions';
import {SubmitButton, Title} from './styles';
import Background from '../../../components/Background/Background';

export default function CheckoutEasy({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  async function handleSubmit() {
    const card_id = navigation.getParam('card_id');
    try {
      const response = await api.post('transaction', {card_id});
      if (response.data) {
        const {cpf, phone} = profile;
        dispatch(completeProfileRequest({cpf, phone}));
        const today = new Date().getTime();
        const dataCalculada = addDays(today, 30);
        const dateSignatureValid = format(
          new Date(new Date(dataCalculada)).getTime(),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          },
        );
        Alert.alert(
          'Pagamento feito com sucesso',
          `Seu acesso à plataforma está válido até ${dateSignatureValid}`,
        );
        navigation.navigate('Home');
      }
    } catch (e) {
      console.tron.log(e.toString());
      Alert.alert(e.toString(), 'Pagamento falhou');
    }
  }
  return (
    <Background>
      <Title>Detalhes do pagamento</Title>
      <View style={{alignSelf: 'center'}}>
        <CardView
          scale={0.94}
          brand={
            navigation.getParam('brand') === 'mastercard'
              ? 'master-card'
              : navigation.getParam('brand')
          }
          name={navigation.getParam('name')}
          number={navigation.getParam('cardNumber')}
        />
      </View>
      <Title>Total: R$30</Title>
      <SubmitButton onPress={() => handleSubmit()}>
        Confirmar pagamento
      </SubmitButton>
    </Background>
  );
}

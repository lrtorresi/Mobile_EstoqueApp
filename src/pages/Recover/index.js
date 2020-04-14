import React from 'react';
import { Platform, View, Text, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles';
import Login from '../Login';

export default function Recover() {


    const navigation = useNavigation();
    //Função para ir para a pagina de criar usuario
    function navigateToLogin() {
        navigation.navigate('Login');
    }

    //Alerta de cadastro com sucesso
    function Alerta() {
        Alert.alert(
            'MDC Software',
            'Verifique as instruções em seu e-mail.',
            [
                { text: 'OK', onPress: () => navigateToLogin(Login) },
            ],
            { cancelable: false }
        );
    }


    return (
        <KeyboardAvoidingView style={style.container} enabled={Platform.OS == 'ios'} behavior={Platform.select({ ios: 'padding', android: null, })}>

            <View style={style.title}>
                <Text style={style.title}>MDC Software :: Contagem APP</Text>
                <Text style={style.subTitle}>- Esqueceu a senha ? -</Text>
            </View>

            <View style={style.formTextTitle}>
                <Text style={style.formTextTitle}>Informe seu e-mail e enviaremos as instruções para você criar sua senha.</Text>
            </View>


            <TextInput
                style={style.Input}
                placeholder="E-mail:"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />



            <TouchableOpacity style={style.button} onPress={Alerta}>
                <Text style={style.buttonText}> ENVIAR </Text>
            </TouchableOpacity>


        </KeyboardAvoidingView>
    )
}

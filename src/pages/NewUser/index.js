import React from 'react';
import { Platform, View, Text, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles';
import Login from '../Login';

export default function NewUser() {

    const navigation = useNavigation();
    //Função para ir para a pagina de criar usuario
    function navigateToLogin() {
        navigation.navigate('Login');
    }

    //Alerta de cadastro com sucesso
    function Alertcadastro() {
        Alert.alert(
            'MDC Software',
            'Cadastro realizado com sucesso! \n Faça seu Login',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => navigateToLogin(Login) },
            ],
            { cancelable: false }
        );
    }



    return (
        <KeyboardAvoidingView style={style.container} enabled={Platform.OS == 'ios'} behavior={Platform.select({ ios: 'padding', android: null, })}>

            <View style={style.title}>
                <Text style={style.title}>MDC Software :: Contagem APP</Text>
                <Text style={style.subTitle}>- Cadastro de usuário -</Text>
            </View>

            <View style={style.formTextTitle}>
                <Text style={style.formTextTitle}>Para começar, precisamos de algumas informações:</Text>
            </View>

            <View style={style.form}>
                <TextInput style={style.form}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false} placeholder="E-mail:"
                    returnKeyType={"go"}
                />
                <TextInput style={style.form} password={true} placeholder="Senha:" returnKeyType={"go"}/>
                <TextInput style={style.form} placeholder="Nome:" returnKeyType={"go"} />
                <TextInput style={style.form} keyboardType='numeric' placeholder="CNPJ / CPF:" returnKeyType={"go"}/>
            </View>


            <TouchableOpacity style={style.button} onPress={Alertcadastro}>
                <Text style={style.buttonText}> CADASTRAR</Text>
            </TouchableOpacity>


        </KeyboardAvoidingView>
    )
}
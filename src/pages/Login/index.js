import React from 'react';
import { Platform, View, Text, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles';



export default function Login() {

  const navigation = useNavigation();

  //Função para ir para a pagina de recuperar senha
  function navigateToRecover() {
    navigation.navigate('Recover');
  }

  //Função para ir para a pagina de criar usuario
  function navigateToNewUser() {
    navigation.navigate('NewUser');
  }

   //Acessar o aplicativo
   function navigateToListProduct() {
    navigation.navigate('ListProduct');
  }

  return (

    <KeyboardAvoidingView style={style.container} enabled={Platform.OS == 'ios'} behavior={Platform.select({ ios: 'padding', android: null, })}>
      <ImageBackground source={require('../../assets/background.png')} style={style.container}>
        <Image source={require('../../assets/logoLogin.png')} style={style.logo} />

        <TextInput style={style.Input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput style={style.Input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          password={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity style={style.button} onPress={navigateToListProduct}>
          <Text style={style.buttonText}> ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToRecover}>
          <Text style={style.linkRecuperarSenha}>  Esqueceu sua senha ?</Text>
        </TouchableOpacity>

        <View style={style.createUser}>
          <TouchableOpacity onPress={navigateToNewUser}>
            <Text style={style.createUserText}> Ainda não tem uma conta? <Text style={style.link}>Registre-se</Text></Text>
          </TouchableOpacity>
        </View>



      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }
});

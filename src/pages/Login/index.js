import React from 'react';
import { Platform, View, Text, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Alert, StatusBar, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, StackNavigator } from '@react-navigation/native';
import style from './styles';
import api from '../../services/api';




export default class App extends React.Component {

  static navigationOptions = {
    title: 'Login',
  }

  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };


  state = {
    email: '',
    password: '',
    error: '',
    success: '',
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  LoginButtonPress = () => {
    this.props.navigation.goBack(); // 
  }

  LoginButtonPress() {
    this.props.navigation.navigate('ListProduct'); // navigate to List screen!
  }

  RecoverButtonPress() {
    this.props.navigation.navigate('Recover'); // navigate to Recover screen!
  }

  NewButtonPress() {
    this.props.navigation.navigate('NewUser'); // navigate to Edit screen!
  }

  handleSignInPress = async () => {

    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);

      Alert.alert(
        'MDC Software',
        'Preencha todos os campos para continuar!',
        [
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
    else {
      try {
        const response = await api.post('/user/login', {
          Email: this.state.email,
          Password: this.state.password,
        });

        // Pegando o Id do usuario e salvando no AsyncStorage
        const dados = response.data;
        const Id = dados[0];
        await AsyncStorage.setItem("mykey", Id["Id"]);


        this.setState({ success: 'Login com sucesso! Redirecionando para o login', error: '' });
        setTimeout(this.goToList, 100);
      }
      catch (_erro) {
        console.log(_erro);
        this.setState({ error: 'Houve um problema com o login, verifique os dados preenchidos!' });

        Alert.alert(
          'MDC Software',
          'Houve um problema com o login, verifique os dados preenchidos!',
          [
            {
              text: 'OK',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    }
  }

  goToList = () => {
    console.log('entrou em goToList');
    try {
      this.props.navigation.navigate('ListProduct'); // navigate to Edit screen!

    }
    catch (_err) {
      console.log(_err);
    }
  }

  render() {
    return (

      <KeyboardAvoidingView style={style.container} enabled={Platform.OS == 'ios'} behavior={Platform.select({ ios: 'padding', android: null, })}>
        <ImageBackground source={require('../../assets/background.png')} style={style.container}>
          <Image source={require('../../assets/logoLogin.png')} style={style.logo} />


          <TextInput style={style.Input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={"go"}
            value={this.state.email}
            onChangeText={this.handleEmailChange}
          />


          <TextInput style={style.Input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            password={true}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={"go"}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
          />


          {this.state.error.length !== 0 && <Text>{this.state.error, console.log(this.state.error)}</Text>}
          <TouchableOpacity style={style.button} onPress={this.handleSignInPress}>
            <Text style={style.buttonText}> ENTRAR</Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={this.RecoverButtonPress.bind(this)}>
            <Text style={style.linkRecuperarSenha}>  Esqueceu sua senha ?</Text>
          </TouchableOpacity>

          <View style={style.createUser}>
            <TouchableOpacity onPress={this.NewButtonPress.bind(this)}>
              <Text style={style.createUserText}> Ainda não tem uma conta? <Text style={style.link}>Registre-se</Text></Text>
            </TouchableOpacity>
          </View>



        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}


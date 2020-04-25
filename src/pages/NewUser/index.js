import React from 'react';
import { Platform, View, Text, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, StackActions, NavigationActions } from '@react-navigation/native';
import style from './styles';
import Login from '../Login';
import api from '../../services/api';


export default class NewUser extends React.Component {
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
        name: '',
        cnpj: '',
        error: '',
        success: '',
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleNameChange = (name) => {
        this.setState({ name });
    };

    handleCnpjChange = (cnpj) => {
        this.setState({ cnpj });
    };

    LoginButtonPress = () => {
        this.props.navigation.goBack(); // 
    }

    LoginButtonPress() {
        this.props.navigation.navigate('Login'); // navigate to Login screen!
    }

    handleSignUpPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0 || this.state.name.length === 0 || this.state.cnpj.length === 0) {
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

        } else {
            try {
                await api.post('/user/newUser', {
                    Email: this.state.email,
                    Password: this.state.password,
                    Name: this.state.name,
                    Cnpj: this.state.cnpj,
                });

                this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

                Alert.alert(
                    'MDC Software',
                    'Usuário cadastrado com sucesso!',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => { setTimeout(this.goToLogin, 1000) } },
                    ],
                    { cancelable: false }
                );
                //setTimeout(this.goToLogin, 1000);

            } catch (_err) {
                console.log(_err);
                this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });

                Alert.alert(
                    'MDC Software',
                    'Houve um problema com o cadastro, verifique os dados preenchidos!',
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
    };


    goToLogin = () => {
        console.log('entrou em gotologin');

        try {
            this.props.navigation.navigate('Login'); // navigate to Edit screen!
            /* const resetAction = StackActions.reset({
               index: 0,
               actions: [
                   NavigationActions.navigate({ routeName: 'Login' }),
               ],
           });
           this.props.navigation.dispatch(resetAction);  */
        }
        catch (_err) {
            console.log(_err);
        }
    }


    render() {
        return (
            <KeyboardAvoidingView style={style.container} enabled={Platform.OS == 'ios'} behavior={Platform.select({ ios: 'padding', android: null, })}>

                <View style={style.title}>
                    <Text style={style.title}>{'CADASTRO DE USUÁRIO        '}</Text>
                    <Text style={style.subTitle}></Text>
                    <Text style={style.subTitle}></Text>
                </View>

                <View style={style.logo}>
                    <Image source={require('../../assets/logoLogin.png')} style={style.logo} />
                </View>

                <View style={style.formTextTitle}>
                    <Text style={style.formTextTitle}>Para começar, precisamos de algumas informações:</Text>
                </View>

                <View style={style.form}>
                    <TextInput style={style.form}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="E-mail:"
                        returnKeyType={"go"}
                        clearButtonMode="always"
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                    />

                    <TextInput style={style.form}
                        password={true}
                        placeholder="Senha:"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={"go"}
                        clearButtonMode="always"
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                    />

                    <TextInput style={style.form}
                        placeholder="Nome / Razão Social:"
                        clearButtonMode="always"
                        returnKeyType={"go"}
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                    />

                    <TextInput style={style.form}
                        //keyboardType='numeric'
                        keyboardType={'numbers-and-punctuation'}
                        autoCorrect={false}
                        clearButtonMode="always"
                        placeholder="CNPJ / CPF:"
                        returnKeyType={"go"}
                        value={this.state.cnpj}
                        onChangeText={this.handleCnpjChange}
                    />

                </View>

                {this.state.error.length !== 0 && <Text>{this.state.error, console.log(this.state.error)}</Text>}
                <TouchableOpacity style={style.button} onPress={this.handleSignUpPress}>
                    <Text style={style.buttonText}> Cadastrar</Text>
                </TouchableOpacity>

                <View style={style.createUser}>
                    <TouchableOpacity onPress={this.LoginButtonPress.bind(this)}>
                        <Text style={style.link}> Voltar para Login</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        )
    }
}
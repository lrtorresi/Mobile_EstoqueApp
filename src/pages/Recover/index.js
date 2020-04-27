import React from 'react';
import { Platform, View, Text, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import style from './styles';
import Login from '../Login';
import api from '../../services/api';


export default class Recover extends React.Component {

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

    };

    goBack() {
        this.props.navigation.navigate('Login'); // navigate to Edit screen!
    }

    LoginButtonPress = () => {
        this.props.navigation.goBack(); // 
    }

    handleEmailChange = (email) => {
        this.setState({ email });
    };


    handleRecoverPress = async () => {

        if (this.state.email.length === 0) {
            this.setState({ error: 'Preencha com seu e-mail!' }, () => false);

            Alert.alert(
                '',
                'Preencha com seu e-mail!',
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
                const response = await api.post('/user/recoverPassword', {
                    Email: this.state.email,
                });

                this.setState({ success: 'E-mail enviaco com sucesso! Redirecionando para a tela de login', error: '' });

                Alert.alert(
                    '',
                    'Sua senha foi enviada para seu e-mail. \n Verifique seu e-mail.',
                    [
                        { text: 'OK', onPress: () => { setTimeout(this.goToLogin, 200); } },
                    ],
                    { cancelable: false }
                );

            }
            catch (_erro) {
                console.log(_erro);
                this.setState({ error: 'Houve um problema no envio do e-mail, verifique os dados preenchidos!' });

                Alert.alert(
                    '',
                    'Houve um problema no envio do e-mail, verifique os dados preenchidos!',
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

    goToLogin = () => {
        try {
            this.props.navigation.navigate('Login'); // navigate to List screen!

        }
        catch (_err) {
            console.log(_err);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container} enabled={Platform.OS == 'ios'} behavior={Platform.select({ ios: 'padding', android: null, })}>

                <View style={style.title}>
                    {/* <Text style={style.title}>{'ESQUECEU A SENHA?            '}</Text>
                    <Text style={style.subTitle}></Text>
                    <Text style={style.subTitle}></Text> */}
                      <Image source={require('../../assets/esqueceu_header.png')} style={style.imgheader}/>
                </View>

                {/* <View style={style.logo}>
                    <Image source={require('../../assets/logoLogin.png')} style={style.logo} />
                </View> */}

                <View style={style.formTextTitle}>
                    <Text style={style.formTextTitle}>Informe seu e-mail e enviaremos as instruções para você criar sua senha.</Text>
                </View>


                <TextInput
                    style={style.Input}
                    placeholder="E-mail:"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                />



                <TouchableOpacity style={style.button} onPress={this.handleRecoverPress}>
                    <Text style={style.buttonText}> ENVIAR </Text>
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
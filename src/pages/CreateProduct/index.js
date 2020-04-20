import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity, TouchableHighlight, Alert, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';




export default class ListProduct extends React.Component {

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
        name: '',
        quantity: '',
        dateDue: '',
        alertDateDue: '',
        userId: 'fbba8d2f',
    };


    ListPress() {
        this.props.navigation.navigate('ListProduct'); // navigate to Edit screen!
    }

    handleNameChange = (name) => {
        this.setState({ name });
    };

    handleQuantityChange = (quantity) => {
        this.setState({ quantity });
    };

    handleDateDueChange = (dateDue) => {
        this.setState({ dateDue });
    };

    handleAlertDueChange = (alertDue) => {
        this.setState({ alertDue });
    };

    handleUserIdDueChange = (userId) => {
        this.setState({ UserId });
    };


    handleCadastrarPress = async () => {

        if (this.state.name.length === 0) {
            this.setState({ error: 'Preencha o Nome do Produto!' }, () => false);

            const Id = await AsyncStorage.getItem ("mykey");
            console.log(Id);

            Alert.alert(
                'MDC Software',
                'Preencha o Nome do Produto!',
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
                const response = await api.post('/product', {
                    Name: this.state.name,
                    DateDue: this.state.dateDue,
                    AlertDateDue: this.state.alertDateDue,
                    UserId: this.state.userId,
                    Quantity: this.state.quantity,
                });
                console.log(response.data.Name);
                this.setState({ success: 'produto criado com sucesso! Redirecionando para a lista de produtos', error: '' });

                Alert.alert(
                    'MDC Software',
                    'Produto cadastrado com sucesso!',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => { setTimeout(this.goToList, 200); } },
                    ],
                    { cancelable: false }
                );

            }
            catch (_erro) {
                console.log(_erro);
                this.setState({ error: 'Houve um problema no cadastro do produto, verifique os dados preenchidos!' });

                Alert.alert(
                    'MDC Software',
                    'Houve um problema no cadastro do produto, verifique os dados preenchidos!',
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
            this.props.navigation.navigate('ListProduct'); // navigate to List screen!

        }
        catch (_err) {
            console.log(_err);
        }
    }


    render() {
        return (
            <View style={style.container} >
                <View style={style.title}>
                    <Text style={style.title}>MDC Software :: Contagem APP</Text>
                    <Text style={style.subTitle}>- Criar Produto -</Text>
                </View>

                <Text style={style.label}>Nome do Produto:</Text>
                <TextInput
                    style={style.Input}
                    placeholder="Descrição do produto"
                    returnKeyType={"go"}
                    clearButtonMode="always"
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                />

                <Text style={style.label}>Quantidade:</Text>
                <TextInput
                    style={style.Input}
                    placeholder="Qtd de itens em estoque (Ex.: 20)"
                    returnKeyType={"go"}
                    keyboardType={'numbers-and-punctuation'}
                    clearButtonMode="always"
                    value={this.state.quantity}
                    onChangeText={this.handleQuantityChange}
                />

                <Text style={style.label}>Validade:</Text>
                <TextInput
                    style={style.Input}
                    placeholder="Data de validade (Ex.: 01/01/2050)"
                    returnKeyType={"go"}
                    keyboardType={'numbers-and-punctuation'}
                    clearButtonMode="always"
                    value={this.dateDue}
                    onChangeText={this.handleDateDueChange}
                />

                <Text style={style.label}>Notificar vencimento:</Text>
                <TextInput
                    style={style.Input}
                    placeholder="Dias de antecedência (Ex.: 7)"
                    returnKeyType={"go"}
                    keyboardType={'numbers-and-punctuation'}
                    clearButtonMode="always"
                    value={this.alertDateDue}
                    onChangeText={this.handleAlertDueChange}
                />



                <TouchableOpacity style={style.button} onPress={this.handleCadastrarPress}>
                    <Text style={style.buttonText}> CADASTRAR</Text>
                </TouchableOpacity>




                <View style={style.addProduct}>
                    <TouchableOpacity onPress={this.ListPress.bind(this)}>
                        <Feather style={style.imglist} name="list" size={28} color="#E82041" />
                        <Text style={style.listProductText}>{'LISTAR \nPRODUTO'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Feather style={style.imgadd} name="plus-circle" size={28} color="#E82041" />
                        <Text style={style.createProductText}>{'ADICIONAR \nPRODUTO'}</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}
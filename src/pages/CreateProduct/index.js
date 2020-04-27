import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity, TouchableHighlight, Alert, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import Moment from 'moment';
import 'moment/locale/pt-br';
import DatePicker from 'react-native-datepicker';


export default class ListProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = { count: 0, dateDue: Moment().utc().format('DD/MM/YYYY') };
        //Settin up an interval for the counter
        this.t = setInterval(() => {
            this.setState({ count: this.state.count + 1 });
        }, 1000);
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
        name: '',
        quantity: '',
        dateDue: '',
        alertDue: '',
        userId: '',
    };

    static navigationOptions = {
        title: 'CreatProduct',
        //Sets Header text of Status Bar
    };



    ListPress() {
        this.props.navigation.push('ListProduct');
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

        if (this.state.name == null) {
            this.setState({ error: 'Preencha o Nome do Produto!' }, () => false);

            Alert.alert(
                '',
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

                this.state.userId = await AsyncStorage.getItem("mykey");

                /* Tratamento de Data */
                var dataVencimento = Moment(this.state.dateDue, "DD/MM/YYYY", "pt, true");
                var vencimento = Moment(dataVencimento).subtract(this.state.alertDue, 'days');

                const response = await api.post('/product', {
                    Name: this.state.name,
                    DateDue: dataVencimento,
                    AlertDateDue: vencimento,
                    UserId: this.state.userId,
                    Quantity: this.state.quantity,

                });

                console.log(response.data.Name, response.data.DateDue, response.data.AlertDateDue, response.data.Quantity, response.data.UserId);

                this.setState({ success: 'produto criado com sucesso! Redirecionando para a lista de produtos', error: '' });

                Alert.alert(
                    '',
                    'Produto cadastrado com sucesso!',
                    [

                        { text: 'OK', onPress: () => { setTimeout(this.goToList, 200); } },
                    ],
                    { cancelable: false }
                );

            }
            catch (_erro) {
                console.log(_erro);
                this.setState({ error: 'Houve um problema no cadastro do produto, verifique os dados preenchidos!' });

                Alert.alert(
                    '',
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
            this.props.navigation.push('ListProduct');
            //this.props.navigation.navigate('ListProduct'); // navigate to List screen!
        }
        catch (_err) {
            console.log(_err);
        }
    }


    render() {
        return (
            <KeyboardAwareScrollView idingView style={style.container} behavior="padding" resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={style.container}
                scrollEnabled={false}>

                <View style={style.title}>
                   {/*  <Text style={style.title}>{'ADICIONAR PRODUTO           '}</Text>
                    <Text style={style.subTitle}></Text>
                    <Text style={style.subTitle}></Text> */}
                    <Image source={require('../../assets/adicionar_header.png')} style={style.imgheader}/>
                </View>

               {/*  <View style={style.logo}>
                    <Image source={require('../../assets/logoLogin.png')} style={style.logo} />
                </View> */}

                
                <View style={style.inputView}>
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
                        autoCorrect={false}
                        keyboardType={'numbers-and-punctuation'}
                        clearButtonMode="always"
                        value={this.state.quantity}
                        onChangeText={this.handleQuantityChange}
                    />

                    <Text style={style.label}>Validade:</Text>
                    <DatePicker
                        style={{ width: 300, marginTop: 10 }}
                        date={this.state.dateDue} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="Selecione a data de validade"
                        format="DD-MM-YYYY"
                        minDate="01-01-2019"
                        maxDate="01-01-2999"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 25,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 70
                            }
                        }}
                        onDateChange={this.handleDateDueChange}
                    />



                    <Text style={style.label}>Notificar vencimento:</Text>
                    <TextInput
                        style={style.Input}
                        placeholder="Dias de antecedência (Ex.: 7)"
                        returnKeyType={"go"}
                        keyboardType={'numeric'}
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={this.alertDue}
                        onChangeText={this.handleAlertDueChange}
                    />



                    <TouchableOpacity style={style.button} onPress={this.handleCadastrarPress}>
                        <Text style={style.buttonText}> CADASTRAR</Text>
                    </TouchableOpacity>
                    </View>



                    <View style={style.addProduct}>
                        <TouchableOpacity onPress={this.ListPress.bind(this)}>
                            <Feather style={style.imglist} name="list" size={28} color="#E82041" />
                            <Text style={style.listProductText}>{'LISTAR \nPRODUTOS'}</Text>
                        </TouchableOpacity>

                        {/*  <TouchableOpacity onPress={() => { }}>
                        <Feather style={style.imgadd} name="plus-circle" size={28} color="#E82041" />
                        <Text style={style.createProductText}>{'ADICIONAR \nPRODUTO'}</Text>
                    </TouchableOpacity> */}
                    </View>

            </KeyboardAwareScrollView >

        )
    }
}
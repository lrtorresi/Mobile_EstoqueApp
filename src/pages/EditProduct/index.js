import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity, TouchableHighlight, Alert, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from './styles'
import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { TextInputMask } from 'react-native-masked-text'
import { ThemeColors } from 'react-navigation';
import Moment from 'moment';
import 'moment/locale/pt-br';
import DatePicker from 'react-native-datepicker';




export default class EditProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            dateDue: Moment(this.props.route.params.item.DateDue).utc().format('DD/MM/YYYY'),
            alertDue: Moment(this.props.route.params.item.AlertDateDue).utc().format('DD/MM/YYYY'),
        };

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
        //dateDue: '',
        //alertDue: '',
        userId: '',
    };

    ListPress() {
        this.props.navigation.push('ListProduct');
        //this.props.navigation.navigate('ListProduct'); // navigate to Edit screen!
    }

    CreatePress() {
        this.props.navigation.push('CreateProduct');
        //this.props.navigation.navigate('CreateProduct'); // navigate to Edit screen!
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

    //Verificando Dados do INPUT
    handleEditPress = async () => {

        if (this.state.name == null) {
            this.state.name = this.props.route.params.item.Name;
        }

        if (this.state.quantity == null) {
            this.state.quantity = this.props.route.params.item.Quantity;
        }

        if (this.state.dateDue == null) {
            this.state.dateDue = this.props.route.params.item.DateDue;
        }

        if (this.state.alertDue == null) {
            this.state.alertDue = this.props.route.params.item.AlertDateDue;
        }

        this.EditApply();
    }

    handleRemovePress = async () => {
        Alert.alert(
            'MDC Software',
            `Deseja excluir o produto \n ${this.props.route.params.item.Name} ?`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },

                { text: 'Sim', onPress: () => { this.RemoveProduct() } },
            ],
            { cancelable: false }
        );
    }

    EditApply = async () => {
        this.state.userId = await AsyncStorage.getItem("mykey");

        try {
            var dataVencimento = Moment(this.state.dateDue, "DD/MM/YYYY");
            var dataAlertaVencimento = Moment(this.state.alertDue, "DD/MM/YYYY");

            const response = await api.put(`/product/${this.props.route.params.item.Id}`, {
                Name: this.state.name,
                DateDue: dataVencimento,
                AlertDateDue: dataAlertaVencimento,
                UserId: this.state.userId,
                Quantity: this.state.quantity,
            });

            this.setState({ success: 'produto editado com sucesso! Redirecionando para a lista de produtos', error: '' });

            Alert.alert(
                'MDC Software',
                'Produto editado com sucesso!',
                [
                    { text: 'OK', onPress: () => { setTimeout(this.goToList, 200); } },
                ],
                { cancelable: false }
            );

        }
        catch (_erro) {
            console.log(_erro);
            this.setState({ error: 'Houve um problema na edição do produto, verifique os dados preenchidos!' });

            Alert.alert(
                'MDC Software',
                'Houve um problema na edição do produto, verifique os dados preenchidos!',
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

    RemoveProduct = async () => {
        try {
            const response = await api.delete(`/product/${this.props.route.params.item.Id}`);

            console.log(response.data);

            this.setState({ success: 'produto excluído com sucesso! Redirecionando para a lista de produtos', error: '' });

            Alert.alert(
                'MDC Software',
                'Produto excluído com sucesso!',
                [
                    { text: 'OK', onPress: () => { setTimeout(this.goToList, 200); } },
                ],
                { cancelable: false }
            );

        }
        catch (_erro) {
            this.setState({ error: 'Houve um problema na exclusão do produto, verifique os dados preenchidos!' });

            Alert.alert(
                'MDC Software',
                'Houve um problema na exclusão do produto, verifique os dados preenchidos!',
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

    goToList = () => {
        try {
            this.props.navigation.push('ListProduct');
            //this.props.navigation.navigate('ListProduct'); // navigate to List screen!
        }
        catch (_err) {
            console.log(_err);
        }
    }

    render() {

        const name = this.props.route.params.item.Name;
        const quantity = this.props.route.params.item.Quantity;

        return (

            <KeyboardAwareScrollView idingView style={style.container} behavior="padding" resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={style.container}
                scrollEnabled={false}>

                <View style={style.title}>
                    <Text style={style.title}>{'EDITAR PRODUTOS            '}</Text>
                    <Text style={style.subTitle}></Text>
                    <Text style={style.subTitle}></Text>
                </View>

                <View style={style.logo}>
                    <Image source={require('../../assets/logoLogin.png')} style={style.logo} />
                </View>
                
                <View style={style.inputView}>
                    <Text style={style.label}>Nome do Produto:</Text>
                    <TextInput
                        style={style.Input}
                        placeholder={name.toString()}
                        returnKeyType={"go"}
                        clearButtonMode="always"
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                    />

                    <Text style={style.label}>Quantidade:</Text>
                    <TextInput
                        style={style.Input}
                        placeholder={quantity.toString()}
                        returnKeyType={"go"}
                        keyboardType={'numbers-and-punctuation'}
                        clearButtonMode="always"
                        //value={this.state.quantity}
                        value={this.state.quantity}
                        onChangeText={this.handleQuantityChange}
                    />

                    <Text style={style.label}>Validade:</Text>
                    <DatePicker
                        style={{ width: 300, marginTop: 20 }}
                        date={this.state.dateDue} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder={'Selecione a data'}
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
                    <DatePicker
                        style={{ width: 300, marginTop: 20 }}
                        date={this.state.alertDue} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder={'Selecione uma data'}
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
                        onDateChange={this.handleAlertDueChange}
                    />




                    {/* //Editar Produto */}
                    <TouchableOpacity style={style.button} onPress={this.handleEditPress}>
                        <Text style={style.buttonText}>EDITAR</Text>
                    </TouchableOpacity>

                    {/* //Excluir Produto */}
                    <TouchableOpacity onPress={this.handleRemovePress}>
                        <Feather style={style.imgtrash} name="trash-2" size={25} color="#ff4040" />
                    </TouchableOpacity>
                </View>


                <View style={style.addProduct}>
                    <TouchableOpacity onPress={this.ListPress.bind(this)}>
                        <Feather style={style.imglist} name="list" size={28} color="#E82041" />
                        <Text style={style.listProductText}>{'LISTAR \nPRODUTO'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.CreatePress.bind(this)}>
                        <Feather style={style.imgadd} name="plus-circle" size={28} color="#E82041" />
                        <Text style={style.createProductText}>{'ADICIONAR \nPRODUTO'}</Text>
                    </TouchableOpacity>
                </View>


            </KeyboardAwareScrollView>

        );
    }
}
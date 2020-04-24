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




export default class EditProduct extends React.Component {


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
        console.log('entrou')
        //const Id = await AsyncStorage.getItem("mykey");

        if (this.state.name.length === 0) {
            this.state.name = this.props.route.params.item.Name;           
        }

        if (this.state.quantity.length === 0) {
            this.state.quantity = this.props.route.params.item.Quantity;           
        }

        if (this.state.dateDue.length === 0) {
            this.state.dateDue = this.props.route.params.item.DateDue;            
        }

        if (this.state.alertDue.length === 0) {
            this.state.alertDue = this.props.route.params.item.alertDue;            
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

            console.log(dataVencimento, dataAlertaVencimento);
            const response = await api.put(`/product/${this.props.route.params.item.Id}`, {
                Name: this.state.name,
                DateDue: dataVencimento,
                AlertDateDue: dataAlertaVencimento,
                UserId: this.state.userId,
                Quantity: this.state.quantity,
            });
            console.log(response);
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
        const dateDue = Moment(this.props.route.params.item.DateDue).utc().format('DD/MM/YYYY');
        const alertDateDue = Moment(this.props.route.params.item.alertDue).utc().format('DD/MM/YYYY');

        return (

            <KeyboardAwareScrollView  idingView style={style.container} behavior="padding"  resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={style.container}
            scrollEnabled={false}>
                <View style={style.title}>
                    <Text style={style.title}>MDC Software :: Contagem APP</Text>
                    <Text style={style.subTitle}>- Editar Produto -</Text>
                </View>
                
                
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
                        value={this.state.quantity}
                        onChangeText={this.handleQuantityChange}
                    />

                    <Text style={style.label}>Validade:</Text>
                    <TextInput
                        style={style.Input}
                        placeholder={dateDue.toString()}
                        returnKeyType={"go"}
                        keyboardType={'numbers-and-punctuation'}
                        clearButtonMode="always"
                        value={this.dateDue}
                        onChangeText={this.handleDateDueChange}
                    />

                    <Text style={style.label}>Notificar vencimento:</Text>
                    <TextInput
                        style={style.Input}
                        placeholder={alertDateDue.toString()}
                        returnKeyType={"go"}
                        keyboardType={'numbers-and-punctuation'}
                        clearButtonMode="always"
                        value={this.alertDue}
                        onChangeText={this.handleAlertDueChange}
                    />



                    {/* //Editar Produto */}
                    <TouchableOpacity style={style.button} onPress={this.handleEditPress}>
                        <Text style={style.buttonText}>EDITAR</Text>
                    </TouchableOpacity>

                    {/* //Excluir Produto */}
                    <TouchableOpacity onPress={this.handleRemovePress}>
                        <Feather style={style.imgtrash} name="trash-2" size={25} color="#ff4040" />
                    </TouchableOpacity>
                


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
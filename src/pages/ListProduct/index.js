//This is an example code to Add Search Bar Filter on Listview//
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, AsyncStorage, ScrollView, RefreshControl, SafeAreaView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import api from '../../services/api';
import Moment from 'moment';
import 'moment/locale/pt-br';


export default class App extends Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, text: '', };
        this.arrayholder = [];
    }

    componentDidMount = async () => {

        const Id = await AsyncStorage.getItem("mykey");
        const url = `https://apinodejsestoqueapp.herokuapp.com/products/${Id}`;

        const response = await fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        method: "GET",
                        isLoading: false,
                        dataSource: responseJson
                    },
                    function () {
                        this.arrayholder = responseJson;
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            text: text,
        });
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.loadRepositorie() });
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }

    CreatePress() {
        this.props.navigation.push('CreateProduct');

        //this.props.navigation.navigate('CreateProduct'); // navigate to Edit screen!
    }

    EditPress = (item) => {
        this.props.navigation.push('EditProduct', { item });
        console.log(item.Name, item.Id, item.Quantity, item.DateDue, item.AlertDateDue)
    }

    handleOnNavigateBack(commentText) {
        console.log("BACK", commentText);
    }

    render() {
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={style.loader} >
                    <ActivityIndicator size="large" color="#095683" />
                </View>
            );
        }

        return (
            //ListView to show with textinput used as search bar
            <View style={style.container} >

                <View style={style.title}>
                    <Text style={style.title}>{'LISTA DE PRODUTOS        '}</Text>
                    <Text style={style.subTitle}></Text>
                    <Text style={style.subTitle}></Text>
                </View>

                <View style={style.logo}>
                    <Image source={require('../../assets/logoLogin.png')} style={style.logo} />
                </View>

                
                    <TextInput
                        style={style.Input}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="Buscar produto..."
                    />

                    <View style={style.legend}>
                        <Text style={style.alertVencido}>{'** Vermelho: Vencidos '}</Text>
                        <Text style={style.alertaVencer}>{'** Amarelo: À vencer'}</Text>
                    </View>

                    <FlatList
                        style={style.list}
                        //onRefresh={() => this.onRefresh()}
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) => {

                            var DataAtual = parseInt(Moment().utc().format('YYYYMMDD'));
                            var DataVencido = parseInt(Moment(item.DateDue).utc().format('YYYYMMDD'));
                            var AlertarVencimento = parseInt(Moment(item.AlertDateDue).utc().format('YYYYMMDD'));

                            //console.log(DataAtual, DataVencido);

                            if (DataVencido > DataAtual && AlertarVencimento > DataAtual) {
                                //console.log('produto normal');
                                return <TouchableOpacity onPress={() => this.EditPress(item)}>
                                    <View>
                                        <Text style={style.incidentProperty}>Item:</Text>
                                        <Text style={style.incidentValue}>{item.Name}</Text>

                                        <Text style={style.incidentValue}>{item.Quantity} Unidades</Text>

                                        <Text style={style.detailsButton}>Data Vencimento:</Text>
                                        <Text style={style.detailsValue}>{Moment(item.DateDue).utc().format('DD/MM/YYYY')}</Text>

                                        <Feather style={style.imgedit} name="edit" size={20} color="#000000" />

                                    </View>
                                </TouchableOpacity>
                            }

                            if (DataAtual > DataVencido) {
                                //console.log('Produto vencido');
                                return <TouchableOpacity onPress={() => this.EditPress(item)}>
                                    <View>
                                        <Text style={style.incidentProperty}>Item:</Text>
                                        <Text style={style.incidentValueDue}>{item.Name}</Text>

                                        <Text style={style.incidentValueDue}>{item.Quantity} Unidades</Text>

                                        <Text style={style.detailsButton}>Data Vencimento:</Text>
                                        <Text style={style.detailsValueDue}>{Moment(item.DateDue).utc().format('DD/MM/YYYY')}</Text>

                                        <Feather style={style.imgedit} name="edit" size={20} color="#000000" />

                                    </View>
                                </TouchableOpacity>
                            }

                            if (AlertarVencimento < DataAtual) {
                                //console.log('Alertar vencimento');
                                return <TouchableOpacity onPress={() => this.EditPress(item)}>
                                    <View>
                                        <Text style={style.incidentProperty}>Item:</Text>
                                        <Text style={style.incidentValueAlert}>{item.Name}</Text>

                                        <Text style={style.incidentValueAlert}>{item.Quantity} Unidades</Text>

                                        <Text style={style.detailsButton}>Data Vencimento:</Text>
                                        <Text style={style.detailsValueAlert}>{Moment(item.DateDue).utc().format('DD/MM/YYYY')}</Text>

                                        <Feather style={style.imgedit} name="edit" size={20} color="#000000" />

                                    </View>
                                </TouchableOpacity>
                            }

                            else {
                                //console.log('caiu em erro e listou aqui');

                                return <TouchableOpacity onPress={() => this.EditPress(item)}>
                                    <View>
                                        <Text style={style.incidentProperty}>Item:</Text>
                                        <Text style={style.incidentValue}>{item.Name}</Text>

                                        <Text style={style.incidentValue}>{item.Quantity} Unidades</Text>

                                        <Text style={style.detailsButton}>Data Vencimento:</Text>
                                        <Text style={style.detailsValue}>{Moment(item.DateDue).utc().format('DD/MM/YYYY')}</Text>

                                        <Feather style={style.imgedit} name="edit" size={20} color="#000000" />

                                    </View>
                                </TouchableOpacity>
                            }

                        }}
                        enableEmptySections={true}
                        keyExtractor={(item, index) => index}
                    />
               

                <View style={style.addProduct}>
                    {/*  <TouchableOpacity onPress={() => { }}>
                        <Feather style={style.imglist} name="list" size={28} color="#E82041" />
                        <Text style={style.listProductText}>{'LISTAR \nPRODUTO'}</Text>
                    </TouchableOpacity>
 */}
                    <TouchableOpacity onPress={this.CreatePress.bind(this)}>
                        <Feather style={style.imgadd} name="plus-circle" size={28} color="#fff" />
                        <Text style={style.createProductText}>{'ADICIONAR \nPRODUTO'}</Text>
                    </TouchableOpacity>

                </View>

            </View >
        );
    }
}


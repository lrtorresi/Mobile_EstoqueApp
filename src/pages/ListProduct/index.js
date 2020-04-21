import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, AsyncStorage, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import api from '../../services/api';
import Moment from 'moment';
import 'moment/locale/pt-br';



export default class ListProduct extends React.Component {


    CreatePress(data) {
        this.props.navigation.navigate('CreateProduct', {data}); // navigate to Edit screen!
    }

    EditPress() {
        this.props.navigation.navigate('EditProduct'); // navigate to Edit screen!
    }

    static navigationOptions = {
        header: null,
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Source Listing",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { textAlign: "center", flex: 1 }
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            loading: true,
            dataSource: []
        };
    }


    componentDidMount() {
        console.log('entrou')
        this.loadRepositorie();
        
    }

    loadRepositorie = async () => {
        
        const Id = await AsyncStorage.getItem("mykey");

        const url = `https://apinodejsestoqueapp.herokuapp.com/products/${Id}`;

        const response = await fetch(url)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    method: "GET",
                    loading: false,
                    dataSource: responseJson
                })
                console.log(url);
                this.setState({ isFetching: false })
            })
            .catch(error => console.log(error)) //to catch the errors if any 
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



    onRefresh() {
        this.setState({ isFetching: true }, function () { this.loadRepositorie() });
    }

    renderItem = (data) =>
        <TouchableOpacity onPress={this.EditPress.bind(this)}>

            <Text style={style.incidentProperty}>Item:</Text>
            <Text style={style.incidentValue}>{data.item.Name}</Text>

            <Text style={style.incidentValue}>{data.item.Quantity} Unidades</Text>

            <Text style={style.detailsButton}>Data Vencimento:</Text>

            <Text style={style.detailsValue}>{Moment(data.item.DateDue).utc().format('DD/MM/YYYY')}</Text>
            <Feather style={style.imgedit} name="edit" size={20} color="#000000" />

        </TouchableOpacity>

    render() {
        if (this.state.loading) {
            return (
                <View style={style.loader}>
                    <ActivityIndicator size="large" color="#095683" />
                </View>
            )
        }

        return (
            <View style={style.container} >

                <View style={style.title}>
                    <Text style={style.title}>MDC Software :: Contagem APP</Text>
                    <Text style={style.subTitle}>- Lista de  Produtos -</Text>
                </View>

                <TextInput style={style.Input}
                    placeholder="                            Buscar produto:"
                />


                <Text style={style.alertVencido}>{'** Vermelho: itens vencidos    '}
                    <Text style={style.alertaVencer}>{'    ** Amarelo: itens à vencer'}
                    </Text>
                </Text>

                <FlatList style={style.list}
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.Id.toString()}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                />


                <View style={style.addProduct}>

                    <TouchableOpacity onPress={() => { }}>
                        <Feather style={style.imglist} name="list" size={28} color="#E82041" />
                        <Text style={style.listProductText}>{'LISTAR \nPRODUTO'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.CreatePress.bind(this.state.dataSource)}>
                        <Feather style={style.imgadd} name="plus-circle" size={28} color="#E82041" />
                        <Text style={style.createProductText}>{'ADICIONAR \nPRODUTO'}</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}





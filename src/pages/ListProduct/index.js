import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import { render } from 'react-dom';
import { useEffect, useState } from 'react';



export default function ListProduct() {

    const navigation = useNavigation();

    //Função para ir para a pagina de Criar Produto
    function navigateToCreateProduct() {
        navigation.navigate('CreateProduct');
    }

    


    return (
        <View style={style.container} >
            <View style={style.title}>
                <Text style={style.title}>MDC Software :: Contagem APP</Text>
                <Text style={style.subTitle}>- Lista de Produtos -</Text>
            </View>


            <TextInput style={style.Input} placeholder="                            Buscar produto:" />

            <View style={alert}>
                <Text style={style.alertVencido}>{'** Vermelho: itens vencidos    '}
                    <Text style={style.alertaVencer}>{'    ** Amarelo: itens à vencer'}
                    </Text>
                </Text>

                <FlatList
                    data={[1, 2, 3, 4 , 5, 6, 7, 8]}
                    keyExtractor={incident => String(incident)}
                    renderItem={() => (
                        <TouchableOpacity onPress={() => {}}>
                        <View style={style.incident}>
                            <Text style={style.incidentProperty}>Item:</Text>
                            <Text style={style.incidentValue}>Queijo Coalho</Text>
                            <Text style={style.incidentValue}>2 Unidades</Text>

                            <Text style={style.detailsButton}>Data Vencimento:</Text>
                            <Text style={style.detailsValue} >06/04/2020</Text>

                        </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={style.addProduct}>

                <TouchableOpacity onPress={() => {}}>
                    <Feather style={style.imglist} name="list" size={28} color="#E82041" />
                    <Text style={style.listProductText}>{'LISTAR \nPRODUTO'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToCreateProduct}>
                    <Feather style={style.imgadd} name="plus-circle" size={28} color="#E82041" />
                    <Text style={style.createProductText}>{'ADICIONAR \nPRODUTO'}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}
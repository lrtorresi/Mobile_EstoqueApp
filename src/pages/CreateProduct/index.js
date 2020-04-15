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

    //Função para ir para a pagina de Listar Produto 
    function navigateToListProduct() {
        navigation.navigate('ListProduct');
    }

    //Função para ir para a pagina de Editar Produto
    function navigateToEditProduct() {
        navigation.navigate('EditProduct');
    }


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
            />

            <Text style={style.label}>Quantidade:</Text>
            <TextInput
                style={style.Input}
                placeholder="Qtd de itens em estoque (Ex.: 20)"
                returnKeyType={"go"}
                keyboardType={'numbers-and-punctuation'}
            />

            <Text style={style.label}>Validade:</Text>
            <TextInput
                style={style.Input}
                placeholder="Data de validade (Ex.: 01/01/2050)"
                returnKeyType={"go"}
                keyboardType={'numbers-and-punctuation'}
            />

            <Text style={style.label}>Notificar vencimento:</Text>
            <TextInput
                style={style.Input}
                placeholder="Dias de antecedência (Ex.: 7)"
                returnKeyType={"go"}
                keyboardType={'numbers-and-punctuation'}
            />



            <TouchableOpacity style={style.button} onPress={() => {}}>
                <Text style={style.buttonText}> CADASTRAR</Text>
            </TouchableOpacity>




            <View style={style.addProduct}>
                <TouchableOpacity onPress={navigateToListProduct}>
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
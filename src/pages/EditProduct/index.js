import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import { useFormik, useFormikContext, withFormik } from 'formik';



export function EditProduct() {

    const navigation = useNavigation();

    //Função para ir para a pagina de Listar Produto 
    function navigateToListProduct() {
        navigation.goBack();
    }

    //Função para ir para a pagina de Listar Produto 
    function navigateToCreateProduct() {
        navigation.navigate('CreateProduct');
    }

    //Alerta de cadastro com sucesso
    function AlertcadastroNewProduct() {
        Alert.alert(
            'MDC Software',
            'Produto cadastrado com sucesso!',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => navigateToListProduct(ListProduct) },
            ],
            { cancelable: false }
        );
    }

    
}
   

export const Form = (props) => (
    <View style={style.container}>
        <View style={style.title}>
            <Text style={style.title}>MDC Software :: Contagem APP</Text>
            <Text style={style.subTitle}>- Editar Produto -</Text>
        </View>

        <Text style={style.label}>Nome do Produto:</Text>
        <TextInput
            style={style.Input}
            value={props.values.Name}
            onChangeText={text => props.setFieldValue('Name', text)}
        />

        <Text style={style.label}>Quantidade:</Text>
        <TextInput
            style={style.Input}
            value={props.values.Quantity}
            onChangeText={text => props.setFieldValue('Quantity', text)}
        />

        <Text style={style.label}>Validade:</Text>
        <TextInput
            style={style.Input}
            value={props.values.DateDue}
            onChangeText={text => props.setFieldValue('DateDue', text)}
        />

        <Text style={style.label}>Notificar vencimento:</Text>
        <TextInput
            style={style.Input}
            value={props.values.Vencimento}
            onChangeText={text => props.setFieldValue('Vencimento', text)}
        />

        <Button style={style.button} onPress={(props.handleSubmit)} title="Login">
            <Text style={style.buttonText}> EDITAR </Text>
        </Button>

        <View style={style.addProduct}>
            
            <TouchableOpacity onPress={() => {}}>
                <Feather style={style.imglist} name="list" size={28} color="#E82041" />
                <Text style={style.listProductText}>{'LISTAR \nPRODUTO'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }}>
                <Feather style={style.imgadd} name="plus-circle" size={28} color="#E82041" />
                <Text style={style.createProductText}>{'ADICIONAR \nPRODUTO'}</Text>
            </TouchableOpacity>
        </View>
        
    </View>


);


export default withFormik({

    mapPropsToValues: () => ({ Name: '', Quantity: '', DateDue: '', Vencimento: '',  UserId: '1231' }),

    handleSubmit: (values) => {
        console.log(values);
    }
})(Form);
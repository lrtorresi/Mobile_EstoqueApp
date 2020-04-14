import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import { render } from 'react-dom';
import { useEffect, useState } from 'react';



export default function ListProduct() {

    return (
        <KeyboardAvoidingView style={style.container} enabled={Platform.OS == 'ios'} behavior={Platform.select({ ios: 'padding', android: null, })}>

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
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    keyExtractor={incident => String(incident)}
                    renderItem={() => (
                        <View style={style.incident}>
                            <Text style={style.incidentProperty}>Item:</Text>
                            <Text style={style.incidentValue}>Queijo Coalho</Text>
                            <Text style={style.incidentValue}>2 Unidades</Text>

                            <Text style={style.detailsButton}>Data Vencimento:</Text>
                            <Text style={style.detailsValue} >06/04/2020</Text>

                        </View>
                    )}
                />



            </View>







            <View style={style.footer}>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={style.footerText} style={style.footerTextLink}>{'LISTAR \n PRODUTO'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Text style={style.footerText} >{'ADICIONAR \n PRODUTO'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Text style={style.footerText}>{'EDITAR \n PRODUTO'}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
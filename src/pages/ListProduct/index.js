import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styles'
import api from '../../services/api';
import Moment from 'moment';
import 'moment/locale/pt-br';


export default function ListProduct() {

  
    

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    //Função para ir para a pagina de Criar Produto
    function navigateToCreateProduct() {
        navigation.navigate('CreateProduct');
    }

    //Função para ir para a pagina de Editar Produto
    function navigateToEditProduct(incident) {
        navigation.navigate('EditProduct', { incident });
    }

    //Função para exinir os itens em tela 
    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total) {
            return;
        }
        setLoading(true);

        const response = await api.get('/products')
        setIncidents(response.data);

    }

    useEffect(() => {
        console.log('lista de produto');
        loadIncidents();
    }, []);

    

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
                    data={incidents}
                    keyExtractor={incident => String(incident.id)}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: incident }) => (

                        <TouchableOpacity onPress={() => navigateToEditProduct(incident)}>
                            <View style={style.incident}>

                                <Text style={style.incidentProperty}>Item:</Text>
                                <Text style={style.incidentValue}>{incident.Name}</Text>

                                <Text style={style.incidentValue}>{incident.Quantity} Unidades</Text>

                                <Text style={style.detailsButton}>Data Vencimento:</Text>

                                <Text style={style.detailsValue}>{Moment(incident.DateDue).utc().format('DD/MM/YYYY')}</Text>
                                <Feather style={style.imgedit} name="edit" size={20} color="#000000" />

                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>


            <View style={style.addProduct}>

                <TouchableOpacity onPress={() => { }}>
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
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },


    title: {
        paddingTop: Constants.statusBarHeight + 0,
        alignItems: 'center',
        backgroundColor: '#153951',
        color: '#fff',
        fontSize: 20
    },

    list: {
        top: 5,
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#f3f3f3",
        marginBottom: 80
    },

    subTitle: {
        alignItems: 'center',
        marginTop: 5,
        color: '#fff',
        fontSize: 17
    },

    Input: {
        justifyContent: 'center',
        left: 30,
        width: 300,
        height: 35,
        marginTop: 8,
        backgroundColor: '#ebebe0',
        fontSize: 15,
        fontWeight: 'bold',
    },

    alertVencido:{
        marginTop: 10,
        fontSize: 15,
        marginLeft: 12,
        color: 'red',
    },

    alertaVencer:{
        color:'#999900',
    },

    incident: {
        height: 100,
        top: 10,
        padding: 10,
        marginBottom: 5,
        borderColor: '#000000',
        backgroundColor: '#e1e1d0',
        
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 10,
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        //color: '#737380',
        color: 'red'
    },

    imgedit:{
        top: -50,
        left: 290,
    },

    detailsButton: {
        color: '#41414d',
        fontWeight: 'bold',
        fontSize: 11,
        paddingHorizontal: 250,
        top: -60,
    },

    detailsValue:{
        marginTop: 8,
        fontSize: 15,
        //color: '#737380',
        color: 'red',
        paddingHorizontal: 250,
        top: -60,
    },

    addProduct: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#153951',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    listProductText: {
        left: 50,
        marginBottom: 5,
        color: '#AAA0A0',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    createProductText: {
        right: 10,
        marginBottom: 10,
        color: '#AAA0A0',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    imglist:{
        top: 35,
        left: 10,
        color: '#AAA0A0',
        fontWeight: 'bold',
    },

    imgadd:{
        top: 35,
        right: 45,
        color: '#AAA0A0',
        fontWeight: 'bold',
    }

    
});
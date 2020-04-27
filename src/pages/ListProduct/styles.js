import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3"
    },

    /*  title: {
         paddingTop: Constants.statusBarHeight + 5,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#01273e',
         color: '#fff',
         fontSize: 19.8,
         fontWeight: 'bold',
     },
  */

    title: {
        paddingTop: Constants.statusBarHeight + 0,
        backgroundColor: '#01273e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imgheader: {
        resizeMode: 'cover',
        width: 385,
        height: 100,
    },


    logo: {
        top: -42,
        left: 145,
        width: 75,
        height: 75,
    },

    list: {
        top: 5,
        paddingVertical: 4,
        margin: 5,
        //backgroundColor: "#f3f3f3",
        backgroundColor: "#e6e6e6",
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
        marginTop: 10,
        backgroundColor: '#ebebe0',
        fontSize: 15,
        fontWeight: 'bold',
    },

    legend: {
        marginTop: 10,
        marginHorizontal: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    alertVencido: {
        fontSize: 15,
        color: 'red',
    },

    alertaVencer: {
        color: '#ffa300',
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
        left: 15,
        fontSize: 15,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 10,
    },

    incidentValueDue: {
        left: 17,
        marginTop: 8,
        fontSize: 15,
        //color: '#737380',
        color: 'red'
    },

    incidentValueAlert: {
        left: 17,
        marginTop: 8,
        fontSize: 15,
        //color: '#737380',
        //color: '#999900',
        color: '#ffa300'
    },

    incidentValue: {
        left: 17,
        marginTop: 8,
        fontSize: 15,
        //color: '#737380',
        color: '#000000'
    },

    imgedit: {
        top: -50,
        left: 290,
    },

    imgAlert: {
        top: -50,
        left: 150,
    },

    detailsButton: {
        color: '#41414d',
        fontWeight: 'bold',
        fontSize: 14,
        paddingHorizontal: 240,
        top: -60,
    },

    detailsValueDue: {
        marginTop: 8,
        fontSize: 15,
        //color: '#737380',
        color: 'red',
        paddingHorizontal: 255,
        top: -60,
    },

    detailsValueAlert: {
        marginTop: 8,
        fontSize: 15,
        color: '#ffa300',
        paddingHorizontal: 255,
        top: -60,
    },

    detailsValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#000000',
        paddingHorizontal: 255,
        top: -60,
    },

    addProduct: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#01273e',
        flexDirection: 'row',
        justifyContent: 'center',
        fontFamily: 'Raleway'
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
        //right: 10,
        marginBottom: 10,
        //color: '#AAA0A0',
        color: '#fff',
        fontSize: 19.8,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },

    imglist: {
        top: 35,
        left: 10,
        color: '#AAA0A0',
        fontWeight: 'bold',
    },

    imgadd: {
        top: 35,
        right: 35,
        //color: '#AAA0A0',
        color: '#fff',
        fontWeight: 'bold',
    }


});
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        //paddingHorizontal: 24,
    },

   /*  title: {
        paddingTop: Constants.statusBarHeight + 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01273e',
        color: '#fff',
        fontSize: 19.8,
        fontWeight: 'bold',
    }, */

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

    subTitle: {
        alignItems: 'center',
        marginTop: 5,
        color: '#fff',
        fontSize: 17
    },

    inputView: {
        marginTop: -15,
    },

    Input: {
        
        marginTop: 20,
        left: 25,
        width: 320,
        height: 20,
        backgroundColor: 'transparent',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 3,
    },

    label: {
        marginLeft: 25,
        marginTop: 20,
        top: 10,
        color: '#000000',
        fontSize: 20
    },

    button: {
        marginLeft: 35,
        width: 300,
        height: 42,
        backgroundColor: '#bab2b2',
        marginTop: 25,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },


    addProduct: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#01273e',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    listProductText: {
        left: 50,
        marginBottom: 5,
        //color: '#AAA0A0',
        color: '#fff',
        fontSize: 19.8,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    createProductText: {
        right: 10,
        marginBottom: 10,
        //color: '#AAA0A0',
        color: '#fff',
        fontSize: 19.8,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    imglist:{
        top: 35,
        left: 10,
        color: '#fff',
        fontWeight: 'bold',
    },

    imgtrash:{
        top: 15,
        left: 170,
        color: '#ff4040',
        fontWeight: 'bold',
    },

    imgadd:{
        top: 35,
        right: 45,
        color: '#fff',
        fontWeight: 'bold',
    }


});
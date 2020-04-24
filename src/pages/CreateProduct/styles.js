import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        //paddingHorizontal: 24,
    },

    title: {
        paddingTop: Constants.statusBarHeight + 0,
        alignItems: 'center',
        backgroundColor: '#153951',
        color: '#fff',
        fontSize: 20
    },

    subTitle: {
        alignItems: 'center',
        marginTop: 5,
        color: '#fff',
        fontSize: 17
    },

    Input: {
        marginTop: 10,
        left: 25,
        width: 320,
        height: 30,
        backgroundColor: 'transparent',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 3,
        
    },

    label: {
        marginLeft: 25,
        marginTop: 25,
        top: 0,
        color: '#000000',
        fontSize: 20
    },

    button: {
        marginLeft: 35,
        width: 300,
        height: 42,
        backgroundColor: '#bab2b2',
        marginTop: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
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
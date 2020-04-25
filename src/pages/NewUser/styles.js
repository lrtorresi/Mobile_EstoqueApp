import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'inherit',
        backgroundColor: '#f5f5f0'
    },

    title: {
        paddingTop: Constants.statusBarHeight + 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01273e',
        color: '#fff',
        fontSize: 19.8,
        fontWeight: 'bold',
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

    formTextTitle: {
        marginTop: -30,
        fontSize: 19,
        color: '#000000',
        alignItems: 'center',
        fontWeight: 'bold'
    },

    form: {
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        color: '#000000',
        fontSize: 16,
        borderColor: '#000000',
    },

    button: {
        left: 35,
        alignItems: 'center',
        width: 300,
        height: 42,
        backgroundColor: '#bab2b2',
        marginTop: 30,
        borderRadius: 4,
        padding: 10,
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
      },

      createUser:{
        marginTop: 50,
        alignItems: 'center'
      },

      link:{
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 17
      }



});
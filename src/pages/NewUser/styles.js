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

    formTextTitle: {
        marginTop: 10,
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


});
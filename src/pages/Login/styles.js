import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#0B2534',
    alignItems: 'center',
    width: '100%', 
    height: '100%'
  },

  logo: {
    marginTop: 100,
    width: 150,
    height: 150,
  },

  Input: {
    top: 10,
    marginTop: 15,
    padding: 10,
    width: 300,
    height: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
  },

  button: {
    width: 300,
    height: 42,
    backgroundColor: '#bab2b2',
    marginTop: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  linkRecuperarSenha: {
    color: '#fff',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 15
  },

  createUser:{
    marginTop: 120,
  },

  createUserText:{
    color: '#fff',
    fontSize: 16
  },

  link:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 17
  }

});
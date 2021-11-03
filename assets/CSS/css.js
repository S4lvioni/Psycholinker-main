import { StyleSheet } from "react-native";

const css = StyleSheet.create({
  graficoDia: (valor = 0, cor = '#fff') => ({
    height: valor,
    backgroundColor: cor,
    marginTop: 15,
    marginHorizontal: 2,
    width: 30,
    textAlign: "center",

  }),
  graficocontainer: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'flex-end'
  },

  fundobranco: {
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_container: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
  },
  esquerda: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginRight: 20
  },
  direita: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffc8db'
  },
  textPage: {
    backgroundColor: 'orange',
    padding: 20
  },
  button__home: {
    marginRight: 20,
  },
  img1: {
    padding: 20,
    width: 60,
    height: 60,
  },
  darkbg: {
    backgroundColor: "#333"
  },
  login__logomarca: {
    marginBottom: 10
  },
  login__msg: (text = 'none') => ({
    fontWeight: "bold",
    fontSize: 18,
    color: "gray",
    marginTop: 15,
    marginBottom: 15,
    display: text,
    textAlign: "center"
  }),
  login__form: {
    width: "80%"
  },
  login__input: {
    backgroundColor:' rgba(255,255,255,0.5)',
    fontSize: 19,
    padding: 7,
    marginBottom: 15,
    borderRadius:10,
    opacity:1,
    color:"#808080",
    marginLeft:20
  },
  login__button: {
    padding: 12,
    backgroundColor: "#FFB6C1",
    alignSelf: "center",
    borderRadius: 5,
    
    marginTop:10
  },
  login__buttonText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#000"
  },
  login__button_container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  SmallIcons: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 32
  },
  listagem: {
    flex: 1
  },
  container3: {
    flex: 1
  },
  cadastros: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  escolha: {
    fontSize: 20
  },
  imagemajuste: {
    marginTop: 3,
    padding: 20,
    width: 60,
    height: 60,
  },
  titulohome: {
    fontSize: 20,
    textAlign: "center",
    padding: 10
  },
  sumario: {
    fontSize: 14,
    textAlign: "left",
    marginLeft: 5,
    padding: 10
  },
  modaltexto: {
    fontSize: 14
  },
  modalbotao: {
    backgroundColor: "#FFB6C1",
    borderRadius: 5,
    width: 70,
    marginLeft: 20,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalcontainer: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  nomepacientehometerapeuta: {
    fontSize: 18,
  },
  pacientegerado: {
    marginLeft: 10,
    flexDirection: "row",
    borderRadius: 2

  },
  codigogerado: {
    textAlign: "center",
    marginTop: 20,
    display: 'none'
  },
  welcometag: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
    marginRight: 5,
    fontWeight:'bold',
    color:'#fff'
  },
  exercicioIcone: {
    width: 122,
    height: 122,

  },
  exercicioIconeContainer: {
    flexDirection: 'row',
    padding: 20
  },
  SmallButtons: {
    backgroundColor: "#FFB6C1",
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    borderRadius: 50,
    marginTop: 5,
  },
  SmallButtonsText: {
    color: '#FFFFFF',
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 3
  },
  Listas: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
   
  },
  
  login_button_modified: {
    padding: 10,
    backgroundColor: "#FFB6C1",
    alignSelf: "center",
    borderRadius: 5,
    margin: 10
  },
  containeredit: {
    margin: 8
  },
  containerbuttonedit: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputes: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  alturalinha: {
    marginLeft: 5,
  }

});


export { css };
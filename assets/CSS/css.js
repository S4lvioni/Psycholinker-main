import { StyleSheet } from "react-native";

const css = StyleSheet.create({
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
    color: "black",
    marginBottom: 15,
    display: text,
    textAlign: "center"
  }),
  login__form: {
    width: "80%"
  },
  login__input: {
    backgroundColor: "#fff",
    fontSize: 19,
    padding: 7,
    marginBottom: 15
  },
  login__button: {
    padding: 12,
    backgroundColor: "#FFB6C1",
    alignSelf: "center",
    borderRadius: 5
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
    fontSize: 30,
  },
  pacientegerado: {
    marginLeft: 10
  },
  codigogerado: {
    textAlign: "center",
    marginTop: 20
  },
  welcometag: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5
  }
});


export { css };
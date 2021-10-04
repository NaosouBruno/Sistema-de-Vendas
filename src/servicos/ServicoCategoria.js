import axios from 'axios'
export default class{
   async carregarCategorias(){
    return await axios.get("http://localhost:3000/categorias")
  } 
}

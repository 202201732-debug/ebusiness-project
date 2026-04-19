import axios from 'axios'

export default {

getProducts() {
return axios.get('http://localhost:5000/api/products')
}

}
import axios from 'axios';

//const osnovniUrl = '/osobe' //pisemo samo nastavak putanje jer kad je na internetu, nece bit localhost
const osnovniUrl = 'http://localhost:3001/osobe' //cijela putanja treba za lokalno na racunalu

const dohvatiSve = () => {
    return axios.get(osnovniUrl);
}

const stvori = noviObjekt => {
    return axios.post(osnovniUrl, noviObjekt)
}

const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}

const brisi= id =>{
    return axios.delete(`${osnovniUrl}/${id}`)
}

export default {dohvatiSve,stvori,osvjezi,brisi}
import React, { useState, useEffect } from 'react';
import Osoba from './components/Osoba';
import OsobeServer from './services/osobe';

const App = () => {
  const [ osobe, postaviOsobe] = useState([]);
  const [ unosImePrezime, postaviImePrezime] = useState("");
  const [ unosEmail, postaviEmail] = useState("");
  const [ unosFilter, postaviFilter] = useState("");

  let zaIspis=unosFilter !== "" ? osobe.filter(o=>o.imeprezime.toLowerCase().includes(unosFilter.toLocaleLowerCase())) : osobe;

  useEffect(()=>{
    console.log("Effect Hook")
    OsobeServer.dohvatiSve()
    .then(response=>{
      console.log("Kontakti dohvaćeni");
      postaviOsobe(response.data);
    })
  }, [])

  const novaOsoba = (e) => {
    e.preventDefault();
    if(unosImePrezime!=="" && unosEmail!==""){
      const noviObjekt={
        id: osobe.length+1,
        imeprezime:unosImePrezime,
        email:unosEmail
      };
      OsobeServer.stvori(noviObjekt)
      .then(response=>{
        console.log(response.data);
        postaviOsobe(osobe.concat(response.data));
        postaviImePrezime("");
        postaviEmail("");
      })
    }
    else{
      alert("Morate unijeti tražene podatke")
    }
  }

  const promjena=(id,imeprezime,email)=>{
    const osoba=osobe.find(o=>o.id===id);
    const novaOs={...osoba,imeprezime:imeprezime,email:email}
    OsobeServer.osvjezi(id,novaOs)
    .then(response=>{
      console.log(response.data);
      postaviOsobe(
        osobe.map(o=>o.id!==id ? o : response.data)
      )
    })
  }

  const brisanje=(id)=>{
    OsobeServer.brisi(id)
    .then(response=>{
      console.log(response)
      postaviOsobe(osobe.filter(o=>o.id!==id))
    })
  }

  
const promjenaImePrezime = (e) => { //imeprezime
  //console.log(e.target.value);
  postaviImePrezime(e.target.value)
}
const promjenaEmail = (e) => { //email
  //console.log(e.target.value);
  postaviEmail(e.target.value)
}
const promjenaFilter = (e) => { //filter
  //console.log(e.target.value);
  postaviFilter(e.target.value)
}

  return(
    <div>
      <div>
        <h1>Adresar - Novo</h1>
        <ul>
          {zaIspis.map(o => 
          <Osoba 
          key={o.id} 
          osoba={o} 
          promjena={promjena}
          brisi={() => brisanje(o.id)}/>)}
        </ul>
        <br></br>
        <label>Filtriraj osobe:</label>
        <br></br>
        <input value={unosFilter} onChange={promjenaFilter} />
        
      </div>
      <div>
        <h2>Novi kontakt</h2>
        <form onSubmit={novaOsoba}>
          <label>Ime i prezime: </label>
          <input value={unosImePrezime} onChange={promjenaImePrezime} />
          <br></br>
          <label>Email adresa: </label>
          <input value={unosEmail} onChange={promjenaEmail} />
          <br></br>
          <button type='submit'>Dodaj</button>
      </form>
      </div>
    </div>
  )
}


export default App
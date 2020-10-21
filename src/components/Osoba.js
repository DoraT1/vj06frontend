import React, {useState} from 'react'

const Osoba=({osoba, promjena, brisi})=>{
    const [imeprezime,postaviImePrezime]=useState(osoba.imeprezime);
    const [email,postaviEmail]=useState(osoba.email)
    const promjenaImePrezime=(e)=>{
        postaviImePrezime(e.target.value);
        
    }
    const promjenaEmail=(e)=>{
        postaviEmail(e.target.value);
       
    }
    const spremiPromjene=()=>{
        promjena(osoba.id,imeprezime,email)
    }
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td><input  value={imeprezime} onChange={promjenaImePrezime}/></td>
                    <td><input  value={email} onChange={promjenaEmail}/></td>
                    <td><button onClick={spremiPromjene}>Spremi promjene</button></td>
                    <td><button onClick={brisi}>Izbriši kontakt</button></td>
                </tr>
                </tbody>
            </table> 
        </div>
      )
}

export default Osoba
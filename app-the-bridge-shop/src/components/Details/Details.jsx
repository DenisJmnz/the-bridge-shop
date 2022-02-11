import  React from 'react'
import './Details.css';

const Details = ({name, price, manufacter, onClick}) => {
  return (
    <div className="divDetails">
      <h1>INFORMACIÓN DEL PRODUCTO</h1>
        <p>MODELO:{name}</p>
        <p>PRECIO:{price}€</p>
        <p>NOMBRE:{manufacter?.name}</p>
        <p>CIF:{manufacter?.cif}</p>
        <p>DIRECCIÓN:{manufacter?.address}</p>
        <button onClick={onClick}>CERRAR</button>
    </div>
  )
}

export default Details
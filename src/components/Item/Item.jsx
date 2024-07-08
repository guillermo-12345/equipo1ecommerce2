import React from "react";
import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

const Item = ({ id, title, img, price, description }) => {
    return (
      <div className="card shadow" style={{ width: '20rem', margin: '.5rem' }}>
       <img src={img} className="card-img-top shadow rounded-2 object-fit-fill p-3"  alt={title} /> 
        <div className="card-body">
          <p className=" text-uppercase card-title">{title}</p>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Mostrar Descripcion
              </Accordion.Header>
              <Accordion.Body>
                {description}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <p className=" text-body-secondary">
                {description}
              </p>
            </div>
          </div>
          <p className=" card-footer">
            ${price}
          </p>
          <Link to={`/item/${id}`} > 
            <button varirant='primary' className="btn btn-primary">
              Ver más
            </button>
          </Link>
        </div>
      </div>
    )
  }
  
  export default Item

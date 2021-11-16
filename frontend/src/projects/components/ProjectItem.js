import React from "react";
import "./ProjectItem.css";

const ProjectItem = (props) => {
  return (
    <li className='project-item'>
      <div className='user-item__info'>
        <h2>{props.name}</h2>
      </div>
      <div className='project-item__buttons'>
        <a href={props.repo}>
          <button>Go to repo</button>
        </a>
        {props.isTester && <button>Buton catre creeare bug</button>}
        {!props.isTester && <button>Buton catre vizualizare proiect</button>}
      </div>
    </li>
  );
};

export default ProjectItem;

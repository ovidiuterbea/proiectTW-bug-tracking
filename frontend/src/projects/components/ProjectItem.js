import React from "react";
import "./ProjectItem.css";
import { Link } from "react-router-dom";

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
        {props.isTester && (
          <Link>
            <button>Buton catre creeare bug</button>
          </Link>
        )}
        {!props.isTester && (
          <Link>
            <button>Buton catre vizualizare proiect</button>
          </Link>
        )}
      </div>
    </li>
  );
};

export default ProjectItem;

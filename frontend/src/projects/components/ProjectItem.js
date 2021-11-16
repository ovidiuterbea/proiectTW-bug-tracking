import React from "react";
import "./ProjectItem.css";

const ProjectItem = (props) => {
  return (
    <li className='project-item'>
      <div className='project-item__content'>
        <div class='user-item__repo'>
          <a href={props.repo}>
            <button>Go to link</button>
          </a>
        </div>
        <div className='user-item__info'>
          <h2>{props.name}</h2>
        </div>
      </div>
    </li>
  );
};

export default ProjectItem;

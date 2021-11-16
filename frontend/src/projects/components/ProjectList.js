import React from "react";
import "./ProjectList.css";
import ProjectItem from "./ProjectItem";

const ProjectList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center'>
        <h2>No Projects found!</h2>
      </div>
    );
  }

  return (
    <ul className='project-list'>
      {props.items.map((project) => {
        return (
          <ProjectItem
            key={project.id}
            id={project.id}
            repo={project.repo}
            users={project.users}
            name={project.name}
          />
        );
      })}
    </ul>
  );
};

export default ProjectList;

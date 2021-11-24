import React from "react";
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
    <ul>
      {props.items.map((project) => {
        return (
          <ProjectItem
            key={project.id}
            id={project.id}
            repo={project.repo}
            users={project.users}
            name={project.name}
            isTester={project.isTester}
            bugs={project.bugs}
          />
        );
      })}
    </ul>
  );
};

export default ProjectList;

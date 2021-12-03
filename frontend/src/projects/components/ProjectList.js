import React from "react";
import ProjectItem from "./ProjectItem";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

const ProjectList = (props) => {
  const auth = useContext(AuthContext);
  if (props.items.length === 0) {
    return (
      <div className='center'>
        <h2>No Projects found!</h2>
      </div>
    );
  }

  let testerCondition;
  return (
    <ul>
      {props.items.map((project) => {
        if (project.users.includes(auth.userId)) {
          testerCondition = false;
        } else {
          testerCondition = true;
        }
        return (
          <ProjectItem
            key={project.id}
            id={project.id}
            repo={project.repo}
            users={project.users}
            name={project.name}
            isTester={testerCondition}
            bugs={project.bugs}
          />
        );
      })}
    </ul>
  );
};

export default ProjectList;

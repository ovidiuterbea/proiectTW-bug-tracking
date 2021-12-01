import React from "react";
import BugItem from "./BugItem";

const ProjectList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center'>
        <h2>No Bugs found!</h2>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map((bug) => {
        return (
          <BugItem
            key={bug.id}
            id={bug.id}
            severity={bug.severity}
            priority={bug.priority}
            description={bug.description}
            linkCommit={bug.linkCommit}
          />
        );
      })}
    </ul>
  );
};

export default ProjectList;

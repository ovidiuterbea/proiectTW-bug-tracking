import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import { useParams } from "react-router";
import "./BugItem.css";

const BugItem = (props) => {
  const projectId = useParams().projectId;
  return (
    <li className='bug-item'>
      <div className='bug-item__description'>
        <h2>{props.description}</h2>
      </div>
      <div className='bug-item__buttons'>
        <Link to={`/:userId/projects/${projectId}/bugs/${props.id}`}>
          <Button id='muibtn' startIcon={<DetailsIcon />}>
            Bug Details
          </Button>
        </Link>
      </div>
    </li>
  );
};

export default BugItem;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
function Nav({ LibraryActive, setLibraryActive }) {
  //Functions
  const libraryHandler = () => {
    setLibraryActive(!LibraryActive);
  };
  return (
    <div className="nav">
      <h3>Waves</h3>
      <button onClick={libraryHandler}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
}

export default Nav;

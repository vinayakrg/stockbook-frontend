import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="page">
      <div id="not-found-page">
        <div className="text-center">
          <h1>Not Found</h1>
          <Link to="/">Back to HOME page</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

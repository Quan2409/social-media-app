import React, { Fragment } from "react";
import "../../styles/homepage/homepage.css";

const Homepage = () => {
  return (
    <Fragment>
      {/* header-begin */}
      <header>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <h1>Logo</h1>
            </div>
            <div className="col-7">
              <h1>Search Bar</h1>
            </div>
            <div className="col-3">
              <h1>Button</h1>
            </div>
          </div>
        </div>
      </header>
      {/* header-end */}

      {/* main-start */}
      <main>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h1>Sidebar</h1>
            </div>
            <div className="col-6">
              <h1>Carousel</h1>
            </div>
            <div className="col-3">
              <h1>Request</h1>
            </div>
          </div>
        </div>
      </main>
      {/* main-footer */}
    </Fragment>
  );
};

export default Homepage;

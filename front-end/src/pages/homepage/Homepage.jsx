import React, { Fragment } from "react";
import "../styles/homepage/homepage.css";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";

const Homepage = () => {
  return (
    <Fragment>
      {/* header-start */}
      <header className="header">
        <Grid container columns={12}>
          <Grid item xs={2}>
            <Item>
              <h1 className="header__logo">Cuisine Hub</h1>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <form action="" className="header__form">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-form"
                />
              </form>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <button className="header__signin">Login</button>
            </Item>
          </Grid>
        </Grid>
      </header>
      {/* header-end */}
    </Fragment>
  );
};

export default Homepage;

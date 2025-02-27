import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const routes = ["/", "/favorites"];
  const history = useHistory();

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (history.location.pathname != routes[value]) {
      // Refresh
      history.push(routes[value]);
    }
  }, [value]);

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} />
        <Tab label="Favorites" index={1} />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;

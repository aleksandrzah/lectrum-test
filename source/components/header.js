import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";

export class Header extends React.Component {
  state = {
      value: 0,
  }

  handleChange = (event, value) => this.setState({ value });

  render () {
      return (
          <Paper>
              <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
              >
                  <Tab label = "Login" component={Link} to="/" />
                  <Tab label = "Signup" component={Link} to="/signup" />
              </Tabs>
          </Paper>
      )
  }
}

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStateI } from '../../rootReducer';
import {
  PropsI,
  ComponentStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
} from './types';
import Header from '../../Components/Header/index';
import Post from '../../Components/Post/index';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {};
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({});

class App extends React.Component<PropsI, ComponentStateI> {
  componentDidMount() {}

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/home" render={() => <Header />} />

            <Route path="/posts" render={() => <Post />} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

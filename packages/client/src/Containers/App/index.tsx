/**
 * @fileinfo
 *
 * The only container for this project.
 *
 * Right now this just mount different components with different attributes
 * based on the route.
 */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStateI } from '../../rootReducer';
import {
  PropsI,
  ComponentStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
  ActionTypes,
} from './types';
import Header from '../../Components/Header/index';
import Post from '../../Components/Post/index';
import { clearPostsAction, getPostsAction } from './action';
import { Action } from '../../types';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {
    posts: state.posts,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (
  dispatch: (action: Action<ActionTypes>) => void
): MapDispatchToPropsI => ({
  // getPosts: fetch posts from server and pass the response to store
  getPosts: (page: number) => dispatch(getPostsAction(page)),
  // clearPosts: clear all the posts stored in appReducer store
  clearPosts: () => dispatch(clearPostsAction()),
});

class App extends React.Component<PropsI, ComponentStateI> {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/header" render={() => <Header />} />

          <Route
            path="/posts"
            render={() => (
              <Post
                isLoading={this.props.isLoading}
                getPosts={this.props.getPosts}
                posts={this.props.posts}
                clearPosts={this.props.clearPosts}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

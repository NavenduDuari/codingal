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
import { clearPostsAction, getPostsAction } from './action';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {
    posts: state.posts,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  getPosts: (page: number) => dispatch(getPostsAction(page)),
  clearPosts: () => dispatch(clearPostsAction()),
});

class App extends React.Component<PropsI, ComponentStateI> {
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

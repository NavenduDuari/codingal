import React, { Component } from 'react';
import { IsPostLoading, PostI } from '../../types';
import './Post.scss';
import { ComponentPropsI, ComponentStateI } from './types';

class Header extends Component<ComponentPropsI, ComponentStateI> {
  lastPostRef: React.RefObject<HTMLDivElement>;

  observer: IntersectionObserver;

  constructor(props: ComponentPropsI) {
    super(props);
    this.state = {
      currentPageNo: 1,
    };

    this.lastPostRef = React.createRef<HTMLDivElement>();

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(this.handleObserver, options);
  }

  componentDidMount() {
    this.props.getPosts(this.state.currentPageNo);
    this.setState((prevState) => ({
      currentPageNo: prevState.currentPageNo + 1,
    }));
  }

  componentDidUpdate() {
    if (this.lastPostRef.current) {
      this.observer.disconnect();
      this.observer.observe(this.lastPostRef.current as Element);
    }
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (this.props.isLoading !== IsPostLoading.NotLoading) return;

    if (entries[0]) {
      if (entries[0].isIntersecting) {
        this.setState((prevState) => ({
          currentPageNo: prevState.currentPageNo + 1,
        }));
        this.props.getPosts(this.state.currentPageNo);
      }
    }
  };

  render() {
    const { posts, isLoading } = this.props;

    return (
      <div className="post-container">
        {posts.map((post: PostI, idx: number) => {
          if (idx === posts.length - 1) {
            return (
              <div key={post.id} ref={this.lastPostRef} className="unit-post">
                <div className="post-title">
                  {post.id}. {post.title}
                </div>
                <div className="post-body">{post.body}</div>
              </div>
            );
          }
          return (
            <div key={post.id} className="unit-post">
              <div className="post-title">
                {post.id}. {post.title}
              </div>
              <div className="post-body">{post.body}</div>
            </div>
          );
        })}
        {isLoading === IsPostLoading.Loading && <div className="loader" />}
      </div>
    );
  }
}

export default Header;

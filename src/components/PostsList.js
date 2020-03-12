import React from 'react'
import PostItem from './PostItem'

export default class PostsList extends React.Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      filteredPosts: [],
      loading: true,
    }
  }

  static defaultProps = {
    link: 'https://www.reddit.com/r/reactjs.json?limit=100',
  }

  filterPosts = () => {
    const { posts } = this.state
    const { commentFilter } = this.props
    const filteredPosts = posts.filter(
      post => post.data.num_comments >= commentFilter
    )
    this.setState({
      filteredPosts,
    })
  }

  getPosts = () => {
    const { link } = this.props
    this.setState({
      loading: true,
    })
    fetch(link)
      .then(response => response.json())
      .then(data => {
        const posts = data.data.children.sort((a, b) => {
          return b.data.num_comments - a.data.num_comments
        })
        this.setState({
          posts,
          loading: false,
        })
        this.filterPosts()
      })
  }

  componentDidMount() {
    this.getPosts()
    this.filterPosts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.commentFilter !== this.props.commentFilter) {
      this.filterPosts()
    }
    if (
      this.props.refreshing &&
      prevProps.refreshing !== this.props.refreshing
    ) {
      this.startRefreshPosts()
      // console.log('start')
    }
    if (
      !this.props.refreshing &&
      prevProps.refreshing !== this.props.refreshing
    ) {
      this.stopRefreshPosts()
      // console.log('stop')
    }
  }

  startRefreshPosts = () => {
    this.updateTimer = setInterval(() => {
      this.getPosts()
    }, 3000)
  }

  stopRefreshPosts = () => {
    clearInterval(this.updateTimer)
  }

  render() {
    const { filteredPosts, loading } = this.state
    return (
      <div>
        {loading ? (
          <div className="loading-message">Loading posts...</div>
        ) : (
          <ul className="reddit-posts">
            {filteredPosts.map(post => {
              return (
                <li key={post.data.id} className="reddit-posts__item">
                  <PostItem item={post} />
                </li>
              )
            })}
          </ul>
        )}
        {filteredPosts.length === 0 ? (
          <div className="reddit-gallery__empty-posts-message">
            No results found matching your criteria
          </div>
        ) : null}
      </div>
    )
  }
}

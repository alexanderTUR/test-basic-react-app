import React from 'react'
import { PostItem } from './PostItem'

export default class PostsList extends React.Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      isLoading: false,
    }
  }

  static defaultProps = {
    link: 'https://www.reddit.com/r/reactjs.json?limit=100',
  }

  componentDidMount() {
    this.getPosts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.enableAutoRefresh !== this.props.enableAutoRefresh) {
      this.updateAutoRefresh()
    }
  }

  getPosts = () => {
    const { link } = this.props
    this.setState({
      isLoading: true,
    })
    fetch(link)
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({
          posts: data.children,
          isLoading: false,
        })
      })
  }

  updateAutoRefresh = () => {
    if (this.props.enableAutoRefresh) {
      this.autoRefresh = setInterval(this.getPosts, 3000)
    } else {
      clearInterval(this.autoRefresh)
    }
  }

  getPostsByComments = (posts, minComments) =>
    posts
      .filter(post => post.data.num_comments >= minComments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments)

  render() {
    const { posts, isLoading } = this.state
    const { minComments } = this.props
    const filteredPosts = this.getPostsByComments(posts, minComments)
    return (
      <div>
        {isLoading ? (
          <p className="loading-message">Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          <ul className="reddit-posts">
            {filteredPosts.map(post => {
              return (
                <li key={post.data.id} className="reddit-posts__item">
                  <PostItem data={post.data} />
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="reddit-gallery__empty-posts-message">
            No results found matching your criteria
          </div>
        )}
      </div>
    )
  }
}

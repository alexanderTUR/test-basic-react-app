import React from 'react'
import cx from 'classnames'
import PostsList from './PostsList'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      refreshing: false,
      commentFilter: 0,
    }
  }

  toggleRefreshButton = () => {
    this.setState({
      refreshing: !this.state.refreshing,
    })
  }

  updateCommentFilter = e => {
    const { value } = e.target
    this.setState({
      commentFilter: value,
    })
  }

  render() {
    const { refreshing, commentFilter } = this.state
    return (
      <section className="reddit-gallery">
        <div className="reddit-gallery__container">
          <h1 className="reddit-gallery__heading">Top commented.</h1>
          <div
            className={cx('reddit-gallery__refresh-button', {
              'reddit-gallery__refresh-button_active': refreshing,
            })}
          >
            <button type="button" onClick={this.toggleRefreshButton}>
              {`${!refreshing ? 'Start ' : 'Stop'} auto-refresh`}
            </button>
          </div>
          <div className="reddit-gallery__range-filter">
            <p>{`Current filter: ${commentFilter} comments`}</p>
            <span>0</span>
            <input
              type="range"
              id="range"
              name="range"
              min="0"
              max="300"
              value={commentFilter}
              step="1"
              onChange={this.updateCommentFilter}
            />
            <span>300</span>
          </div>
          <PostsList refreshing={refreshing} commentFilter={commentFilter} />
        </div>
      </section>
    )
  }
}

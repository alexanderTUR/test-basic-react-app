import React from 'react'
import cx from 'classnames'
import PostsList from './PostsList'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      enableAutoRefresh: false,
      minComments: 0,
    }
  }

  toggleRefreshButton = () => {
    this.setState({
      enableAutoRefresh: !this.state.enableAutoRefresh,
    })
  }

  updateCommentsFilter = e => {
    const { value } = e.target
    this.setState({
      minComments: value,
    })
  }

  render() {
    const { enableAutoRefresh, minComments } = this.state
    return (
      <section className="reddit-gallery">
        <div className="reddit-gallery__container">
          <h1 className="reddit-gallery__heading">Top commented.</h1>
          <div
            className={cx('reddit-gallery__refresh-button', {
              'reddit-gallery__refresh-button_active': enableAutoRefresh,
            })}
          >
            <button type="button" onClick={this.toggleRefreshButton}>
              {`${enableAutoRefresh ? 'Stop ' : 'Start'} auto-refresh`}
            </button>
          </div>
          <div className="reddit-gallery__range-filter">
            <p>{`Current filter: ${minComments} comments`}</p>
            <div className="reddit-gallery__range-filter-container">
              <span>0</span>
              <input
                type="range"
                id="range"
                name="range"
                min={0}
                max={300}
                value={minComments}
                step="1"
                onChange={this.updateCommentsFilter}
              />
              <span>300</span>
            </div>
          </div>
          <PostsList
            enableAutoRefresh={enableAutoRefresh}
            minComments={minComments}
          />
        </div>
      </section>
    )
  }
}

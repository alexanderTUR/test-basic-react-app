import React from 'react'
import cx from 'classnames'

export default class Controls extends React.Component {
  render() {
    const {
      enableAutoRefresh,
      minComments,
      toggleRefreshButton,
      updateCommentsFilter,
    } = this.props

    return (
      <div className="reddit-gallery__controls">
        <div
          className={cx('reddit-gallery__refresh-button', {
            'reddit-gallery__refresh-button_active': enableAutoRefresh,
          })}
        >
          <button type="button" onClick={toggleRefreshButton}>
            {`${enableAutoRefresh ? 'Stop ' : 'Start'} auto-refresh`}
          </button>
        </div>
        <div className="reddit-gallery__range-filter">
          <p>{`Current filter: ${minComments} comments`}</p>
          <div className="reddit-gallery__range-input-wrapper">
            <span>0</span>
            <input
              type="range"
              id="range"
              name="range"
              min={0}
              max={300}
              value={minComments}
              step="1"
              onChange={updateCommentsFilter}
            />
            <span>300</span>
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react'
import Controls from './Controls'
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
          <Controls
            enableAutoRefresh={enableAutoRefresh}
            minComments={minComments}
            toggleRefreshButton={this.toggleRefreshButton}
            updateCommentsFilter={this.updateCommentsFilter}
          />
          <PostsList
            enableAutoRefresh={enableAutoRefresh}
            minComments={minComments}
          />
        </div>
      </section>
    )
  }
}

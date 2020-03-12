import React from 'react'
import defaultPostImage from '../images/communityIcon.png'

export default class PostItem extends React.Component {
  render() {
    var urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i' // fragment locator
    )
    const { thumbnail, title, num_comments, permalink } = this.props.item.data
    return (
      <div className="reddit-post">
        <div className="reddit-post__image">
          <img
            src={urlPattern.test(thumbnail) ? thumbnail : defaultPostImage}
            alt={title}
          />
        </div>

        <div className="reddit-post__body">
          <h2 className="reddit-post__title">{title}</h2>
          <p>Number of comments: {num_comments}</p>
          <a
            href={`https://www.reddit.com/${permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
        </div>
      </div>
    )
  }
}

import React, { memo } from 'react'
import defaultPostImage from '../images/communityIcon.png'

export const PostItem = memo(({ data }) => {
  var urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i' // fragment locator
  )

  return (
    <div className="reddit-post">
      <div className="reddit-post__image">
        <img
          src={
            urlPattern.test(data.thumbnail) ? data.thumbnail : defaultPostImage
          }
          alt={data.title}
        />
      </div>

      <div className="reddit-post__body">
        <h2 className="reddit-post__title">{data.title}</h2>
        <p>Number of comments: {data.num_comments}</p>
        <a
          href={`https://www.reddit.com/${data.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </a>
      </div>
    </div>
  )
})

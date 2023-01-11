import React from "react"
import { Helmet } from "react-helmet"

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Welcome to Proshop",
  description: "We sell best electronics at cheap rates",
  keywords: "electronics, buy elctronics, cheap electronics",
}

export default Meta

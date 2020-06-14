const convertToSlug = name => {
  let slug = name
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

  return slug
}

export {
  convertToSlug
}

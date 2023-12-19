const getPhoto = (photo: string) => {
  return photo && photo.substr(0, 4) === 'http'
    ? photo
    : photo
    ? `${process.env.MIDIA_CLOUDFRONT}${photo}`
    : '/images/no_photo.png'
}

export default getPhoto

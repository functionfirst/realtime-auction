const newUserSignup = ({ name, email, _id }) => {
  const uid_link = `${process.env.DOMAIN}/users/${_id}`
  const template = {
    from: `${name}<${email}>`,
    to: process.env.EMAIL,
    subject: `${name} - New Account Request`,
    text: `A new user has signed up.\r\nName: ${name}\r\n${uid_link}`,
    html: `<p>A new user has signed up.</p><p>Name: ${name}</p><p><a href="${uid_link}">${uid_link}</a></p>`
  }

  return template
}

module.exports = {
  newUserSignup
}

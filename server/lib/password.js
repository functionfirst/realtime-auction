import bcrypt from 'bcrypt'
const { compareSync, genSaltSync, hashSync } = bcrypt

const saltRounds = 10;

const comparePassword = (password, compare) => compareSync(password, compare)

const hashPassword = (password) => {
  try {
    const salt = genSaltSync(saltRounds);
    const hashedPassword = hashSync(password, salt);

    return hashedPassword;
  } catch ({ message }) {
    throw new Error(message)
  }
}

export {
  comparePassword,
  hashPassword
}

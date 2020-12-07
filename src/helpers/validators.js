export const required = (value) => {
  if (value) return undefined;

  return 'The field cannot be empty!'
}

export const exactLengthCreator = (exactLength) => (value) => {
  if (value.length !== exactLength) return `The length of the filed must be ${exactLength} digits.`

  return undefined;
}

export const minLengthCreator = (minLength) => (value) => {
  if (value.length < minLength) return `The password can't be less than ${minLength} symbols.`
  
  return undefined;
}
 

export const onlyNumbers = (value) => {
  if (!/^[0-9]+$/.test(value)) return `Filed must have only digits.`

  return undefined;
}

export const noLetters = (value) => {
  if (!/^[^a-zA-Z\u0410-\u044F`]+$/.test(value)) return `Field must have no letters.`

  return undefined;
}

export const validateEmail = (email) => {
  if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase())) return 'Enter valid email'

  return undefined
}


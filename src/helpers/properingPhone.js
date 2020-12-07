const properingPhone = (phone) => {

  let properPhone = phone.split('');
  properPhone.splice(3, 0, '-');
  properPhone.splice(7, 0, '-');
  properPhone.join('');

  return properPhone;
}

export default properingPhone;


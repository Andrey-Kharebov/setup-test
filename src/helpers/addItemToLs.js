const addItemToLs = (lsItem, addedItem) => {
  let lsArr = JSON.parse(localStorage.getItem(lsItem));
  lsArr = [...lsArr, addedItem];
  localStorage.setItem(lsItem, JSON.stringify(lsArr))
}

export default addItemToLs;
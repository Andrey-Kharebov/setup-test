const removeItemInLs = (lsItem, removedItem) => {
  let lsArr = JSON.parse(localStorage.getItem(lsItem));
  lsArr = lsArr.filter(u => u.id !== removedItem.id);
  localStorage.setItem(lsItem, JSON.stringify(lsArr));
}

export default removeItemInLs;
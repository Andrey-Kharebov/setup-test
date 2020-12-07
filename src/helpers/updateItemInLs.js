const updateItemInLs = (lsItem, updatedItem) => {
  let lsArr = JSON.parse(localStorage.getItem(lsItem));
    
  lsArr = lsArr.map(u => {
    if (u.id === updatedItem.id) {
      return updatedItem;
    } else {
      return u;
    }
  })

  localStorage.setItem(lsItem, JSON.stringify(lsArr))
}

export default updateItemInLs;
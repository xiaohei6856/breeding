const setlocal = (key,values)=>{
  localStorage.setItem(key,values)
}
const getlocal = (key)=>{
  const value = localStorage.getItem(key)
  return value
}
const removelocal = (key)=> {
  localStorage.removeItem(key)
}

export { setlocal, getlocal,removelocal }
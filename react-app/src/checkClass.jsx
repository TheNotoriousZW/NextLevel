

export function checkClass (classname, elemid){
 
  if(document.getElementById(elemid)) {
    if(document.getElementById(elemid).classList.contains(classname)){
      return true
    }
  }
  return false
}

export const useLocalStorage = (key) => {
  const setItem = (value) => {
    try{
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    catch{
      console.log(error)
    }
  }
    const getItem = () => {
      try{
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item): null;
      }
      catch(error){
        console.log(error)
      }
  
    };
    

  return {setItem, getItem};
}
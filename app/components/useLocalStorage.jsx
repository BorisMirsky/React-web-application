import { useState, useEffect } from "react";
import {App} from "./app.jsx";



function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}


export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
  });
 
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
 
  return [value, setValue];
};


//export { useLocalStorage };
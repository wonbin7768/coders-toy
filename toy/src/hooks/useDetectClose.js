import { useEffect, useState } from "react";
const useDetectClose = (detect, state) => {
  const [isOpen, setIsOpen] = useState(state);
  useEffect(() => {
    const onClick = (e) => {
      if (detect.current !== null && !detect.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    if (isOpen) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen,detect]);
  return [isOpen, setIsOpen];
};
export default useDetectClose;

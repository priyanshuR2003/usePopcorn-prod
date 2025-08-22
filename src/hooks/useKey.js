import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.code === key) action();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [key, action]);
}

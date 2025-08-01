import { useEffect, useState } from "react";

const useDebounce = (search: string) => {
    const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return debouncedSearch
}

export default useDebounce
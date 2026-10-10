import { useState, useEffect } from 'react';

const useIsSmall = () => {
  const checkSize = () => window.innerWidth < 1100;
  const [isSmall, setIsSmall] = useState(checkSize);
  useEffect(() => {
    const handleResize = () => setIsSmall(checkSize);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isSmall;
};

export default useIsSmall;

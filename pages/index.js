// pages/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/users'); // Redirect to the posts page
  }, []);

  return null; // This component doesn't render anything, it just redirects
};

export default Home;

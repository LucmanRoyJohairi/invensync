'use client';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/app/lib/api';
import { User } from '@/types/User';

export default function Page() {
  const [data, setData] = useState<User[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchWithAuth('/users');
        console.log('🚀 ~ getData ~ res:', res);

        if (res.ok) {
          const json = await res.json();
          console.log('🚀 ~ getData ~ json:', json);
          setData(json);
        } else {
          // router.push('/auth/login');
        }
      } catch (err) {
        console.log(err);

        // router.push('/auth/login');
      }
    };

    getData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome</h1>
      {/* <p>Secret: {data.secret}</p> */}
    </div>
  );
}

import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch('http://api.200degres.fr/api/drinks')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async  function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Vous pouvez ajouter des dépendances au tableau de dépendances useEffect si nécessaire
  }, []);

  

  return (
    <main className="flex flex-col p-8 w-screen">
        <h1 className="neon mb-8">La carte</h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((data) => (
        
        <Link key={data.id} href={`/show/${data.id}`}>
        <div   className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="bg-white rounded-t-lg">
                <img className="rounded-t-lg  m-auto h-[340px]" src={`${data.image}`} alt="" />
            </div>
            <div className="p-5">
                    <h5 className="mb-2 text-l text-center font-bold tracking-tight text-gray-900 dark:text-white">{data.name}</h5>
                    <p className="text-center text-xs">{data.type}</p>
            </div>
        </div>
        </Link>
      ))}
    </div>
    </main>
  );
}

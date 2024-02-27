async function getData(id) {
  const res = await fetch('http://api.hsrk2216.odns.fr/api/drinks/' + id)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Page({ params }) {

  const id = params.id;

  const data = await getData(id);


  // id contient maintenant la valeur du slug provenant de l'URL

  return (
    <main className="flex flex-col p-8 w-screen items-center">
      
      
      <h1>{data.name}</h1>
      <img className="rounded-lg h-60 w-fit py-5" src={data.image} alt="" />
    
      <p>{data.type}</p>
      <p className="py-5 text-center">{data.description}</p>
    </main>
  );
}
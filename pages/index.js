import useSWR from "swr";
import Image from "next/image";

export default function HomePage({ name, artist, imageSource }) {
  return (
    <div>
      <h1>Hello from Next.js</h1>
      <Character name={name} artist={artist} imageSoruce={imageSource} />
    </div>
  );
}
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Character() {
  const { data, error, isLoading } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );
  console.log(data);
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  // render data

  return (
    <ul>
      {data.map(({ slug, artist, imageSource, name }) => (
        <ul key={slug}>
          <li>
            {name}, {artist}, {imageSource}
          </li>
        </ul>
      ))}
    </ul>
  );
}

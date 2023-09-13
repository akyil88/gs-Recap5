import useSWR from "swr";
import Image from "next/image";

export default function HomePage() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  // const { artist, name, imageSource } = data;
  // render data
  return (
    <ul>
      <h1>Hello from Next.js</h1>
      {data.map(({ slug, imageSource, artist }) => {
        return (
          <li key={slug}>
            {artist}{" "}
            <Image
              src={imageSource}
              width={500}
              height={500}
              alt={imageSource}
            />
          </li>
        );
      })}
    </ul>
  );
}

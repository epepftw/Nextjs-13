import { trpc } from "@/utils/trpc";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "bro" });
  const name = trpc.deenice.useQuery({ owner: "Balakahye", age: 25 });

  if (!hello.data || !name.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
      <h1>{name.data.name}</h1>
    </div>
  );
}

import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.poke_id.useQuery({ id: first });
  const secondPokemon = trpc.poke_id.useQuery({ id: second });

  const btn =
    "bg-blue-500 hover:bg-blue-700 text-white m-auto py-2 w-3/5 rounded-full text-xl capitalize  text-center mt-5";

  console.log(firstPokemon.data);
  console.log(secondPokemon.data);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForStrongest = (selected: number) => {
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">🙀Which Pokemon is Heavier?🏋️‍♂️</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-56 h-100 flex flex-col">
          <img
            className="w-full"
            src={firstPokemon.data?.sprites ? firstPokemon.data.sprites : ""}
          />
          <button onClick={() => voteForStrongest(first)} className={btn}>
            {firstPokemon.data?.name ? firstPokemon.data.name : ""}
          </button>
        </div>
        <div className="p-8">VS</div>
        <div className="w-56 h-100 flex flex-col">
          <img
            className="w-full"
            src={secondPokemon.data?.sprites ? secondPokemon.data.sprites : ""}
          />
          <button onClick={() => voteForStrongest(second)} className={btn}>
            {secondPokemon.data?.name ? secondPokemon.data.name : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

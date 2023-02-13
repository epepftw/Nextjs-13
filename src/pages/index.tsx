import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const [ids, updateIds] = useState(getOptionsForVote);
  const [first, second] = ids;

  const firstPokemon = trpc.poke_id.useQuery({ id: first });
  const secondPokemon = trpc.poke_id.useQuery({ id: second });

  console.log(firstPokemon.data, first);
  console.log(secondPokemon.data, second);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  // const voteForRoundest = (selected: number) => {
  //   updateIds(getOptionsForVote());
  // };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-16 h-16 bg-red-600">{first}</div>
        <div className="p-8">VS</div>
        <div className="w-16 h-16 bg-red-600">{second}</div>
      </div>
    </div>
  );
}

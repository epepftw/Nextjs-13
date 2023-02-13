import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.poke_id.useQuery({ id: first });
  const secondPokemon = trpc.poke_id.useQuery({ id: second });

  console.log(firstPokemon.data);
  console.log(secondPokemon.data);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  // const voteForRoundest = (selected: number) => {
  //   updateIds(getOptionsForVote());
  // };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Who is more cute?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-36 h-36 flex flex-col">
          <img
            className="w-full"
            src={
              firstPokemon.data?.sprites.front_default
                ? firstPokemon.data.sprites.front_default
                : ""
            }
          />
          <p className="text-xl capitalize text-center -mt-5">
            {firstPokemon.data?.name ? firstPokemon.data.name : ""}
          </p>
        </div>
        <div className="p-8">VS</div>
        <div className="w-36 h-36 flex flex-col">
          <img
            className="w-full"
            src={
              secondPokemon.data?.sprites.front_default
                ? secondPokemon.data.sprites.front_default
                : ""
            }
          />
          <p className="text-xl capitalize  text-center -mt-5">
            {secondPokemon.data?.name ? secondPokemon.data.name : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

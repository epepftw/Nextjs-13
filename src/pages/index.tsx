import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import Head from "next/head";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const [points, setPoints] = useState(0);

  const firstPokemon = trpc.poke_id.useQuery({ id: first });
  const secondPokemon = trpc.poke_id.useQuery({ id: second });

  const btn =
    "bg-blue-500 hover:bg-blue-700 text-white m-auto py-2 w-3/5 rounded-full text-xl capitalize  text-center mt-5";

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const firstChoice = () => {
    if (firstPokemon.data?.weight && secondPokemon.data?.weight) {
      if (firstPokemon.data?.weight > secondPokemon.data?.weight) {
        console.log("correct");
        setPoints(points + 1);
      } else {
        console.log("wrong");
      }
    }
  };

  const secondChoice = () => {
    if (firstPokemon.data?.weight && secondPokemon.data?.weight) {
      if (firstPokemon.data?.weight < secondPokemon.data?.weight) {
        console.log("correct");
        setPoints(points + 1);
      } else {
        console.log("wrong");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Pokemon?</title>
      </Head>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">
          🙀Which Pokemon is Heavier?🏋️‍♂️
        </div>
        <div className="p-2"></div>
        <div className=" rounded p-8 flex justify-between items-center max-w-2xl">
          <div className="w-56 h-100 flex flex-col">
            <img
              className="w-full"
              src={firstPokemon.data?.sprites ? firstPokemon.data.sprites : ""}
            />
            <button onClick={firstChoice} className={btn}>
              {firstPokemon.data?.name ? firstPokemon.data.name : ""}
            </button>
          </div>
          <div className="p-8">VS</div>
          <div className="w-56 h-100 flex flex-col">
            <img
              className="w-full"
              src={
                secondPokemon.data?.sprites ? secondPokemon.data.sprites : ""
              }
            />
            <button onClick={secondChoice} className={btn}>
              {secondPokemon.data?.name ? secondPokemon.data.name : ""}
            </button>
          </div>
        </div>

        <div className="points">Your Points : {points}</div>
      </div>
    </>
  );
}

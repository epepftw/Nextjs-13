import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import swal from "sweetalert";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const [points, setPoints] = useState(0);
  const [life, setLife] = useState(5);
  const hearts = ["💙", "❤️", "💜", "🧡", "💚"];

  const router = useRouter();
  const reload = () => {
    router.reload();
  };

  const firstPokemon = trpc.poke_id.useQuery({ id: first });
  const secondPokemon = trpc.poke_id.useQuery({ id: second });

  const btn =
    "bg-red-900 border text-red-500 text-2xl md:text-4xl pokefont border-yellow-500 hover:bg-blue-700 text-white m-auto py-2 px-3 rounded-full text-xl capitalize  text-center mt-5";

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const firstChoice = () => {
    if (firstPokemon.data?.weight && secondPokemon.data?.weight) {
      if (firstPokemon.data?.weight > secondPokemon.data?.weight) {
        setPoints(points + 1);
        swal({
          title: "Correct!!",
          text: `${firstPokemon.data?.name.replace(/^\w/, (c) =>
            c.toUpperCase()
          )} is heavier!😲😲🤯`,
          icon: "success",
          buttons: {
            confirm: {
              text: "Aww yeeaa!!",
              value: true,
            },
          },
        }).then(() => {
          updateIds(getOptionsForVote());
        });
      } else if (life === 1) {
        setLife(life - 1);
        swal({
          title: `Game Over! Your final score is ${points}.`,
          text: "Sorry just try again 😭😞",
          icon: "error",
          dangerMode: true,
          buttons: {
            confirm: {
              text: "Okay🙄",
              value: true,
            },
          },
        }).then(() => {
          setLife(5);
          setPoints(0);
          updateIds(getOptionsForVote());
        });
      } else {
        swal({
          title: "Wrong!!",
          text: `${firstPokemon.data?.name.replace(/^\w/, (c) =>
            c.toUpperCase()
          )} is too smol!🤏🤪`,
          icon: "error",
          dangerMode: true,
          buttons: {
            confirm: {
              text: "Aww pooo!!",
              value: true,
            },
          },
        }).then(() => {
          setLife(life - 1);
          updateIds(getOptionsForVote());
        });
      }
    }
  };

  const secondChoice = () => {
    if (firstPokemon.data?.weight && secondPokemon.data?.weight) {
      if (firstPokemon.data?.weight < secondPokemon.data?.weight) {
        setPoints(points + 1);
        swal({
          title: "Correct!!",
          text: `${secondPokemon.data?.name.replace(/^\w/, (c) =>
            c.toUpperCase()
          )} is heavier!😲😲🤯`,
          icon: "success",
          buttons: {
            confirm: {
              text: "Aww yeeaa!!",
              value: true,
            },
          },
        }).then(() => {
          updateIds(getOptionsForVote());
        });
      } else if (life === 1) {
        setLife(life - 1);
        swal({
          title: `Game Over! Your final score is ${points}.`,
          text: "Sorry just try again 😭😞",
          icon: "error",
          dangerMode: true,
          buttons: {
            confirm: {
              text: "Okay🙄",
              value: true,
            },
          },
        }).then(() => {
          setLife(5);
          setPoints(0);
          updateIds(getOptionsForVote());
        });
      } else {
        swal({
          title: "Wrong!!",
          text: `${secondPokemon.data?.name.replace(/^\w/, (c) =>
            c.toUpperCase()
          )} is too smol!🤏🤪`,
          icon: "error",
          dangerMode: true,
          buttons: {
            confirm: {
              text: "Aww pooo!!",
              value: true,
            },
          },
        }).then(() => {
          setLife(life - 1);
          updateIds(getOptionsForVote());
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Pokemon?</title>
      </Head>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="lg:text-8xl md:text-6xl sm:text-3xl text-3xl text-center pokefont">
          🙀Which Pokemon is Heavier?🏋️‍♂️
        </div>
        <div className="p-2"></div>
        <div className="flex justify-between items-center max-w-2xl">
          <div className="w-32 lg:w-56 md:w-48 h-100 flex flex-col">
            <img
              className="w-full"
              src={firstPokemon.data?.sprites ? firstPokemon.data.sprites : ""}
            />
            <button onClick={firstChoice} className={btn}>
              {firstPokemon.data?.name ? firstPokemon.data.name : ""}
            </button>
          </div>
          <div className="p-2 pokefont text-5xl">VS</div>
          <div className="w-32 lg:w-56 md:w-48 h-100 flex flex-col">
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

        <div className="pt-16 text-center">
          <div className="points text-3xl md:text-6xl pokefont">
            Your Points : {points}
          </div>
          <div className="points text-2xl md:text-5xl pokefont mt-6">
            Life :{" "}
            {hearts.slice(0, life).map((heart, index) => (
              <span key={index}>{heart}</span>
            ))}
          </div>
          <div className="flex my-5 text-center justify-center text-2xl pokefont items-center px-1">
            <p>
              Refresh the page to reset game or click&nbsp;&nbsp;
              <button
                className="text-5xl text-green-500 underline"
                onClick={reload}
              >
                here.
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

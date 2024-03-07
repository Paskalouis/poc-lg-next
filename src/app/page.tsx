import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";
import groupsJson from "./groups.json";

export interface Category {
  code: string;
  name: string;
  imagePath: string;
  slug: string;
  percentageDiscount: number;
}

export interface Group {
  groupCategory: string;
  title: string;
  categories: Category[];
}

function getGroups(): Promise<Group[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(groupsJson.data);
    }, 500);
  });
}

async function getData() {
  const groups = await getGroups();
  return groups
}

export default async function Home() {
  const groups = await getData() 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="pb-8 md:pb-28 static lg:relative z-10">
        <div className="pt-20 md:pt-24 pb-12 max-w-7xl mx-auto justify-between">
          <Image
            className="w-full h-full object-cover object-center"
            src="https://assets.lapakgaming.com/lapakgaming/images/banner/202402/Ff5000-Banner.png?tr=w-1080%2Cq-75"
            alt="caption"
            width={1080}
            height={500}
            loading="eager"
            decoding="auto"
          />
          <div
            data-testid="home-cardgame-section"
            className="container mx-auto px-4 lg:px-10 pt-16"
          >
            {groups.map((item, idx) => (
              <section className="mb-8 md:mb-10" key={`person-${idx}`}>
                <h2 className="text-base md:text-xl font-bold pl-4 md:pl-6 border-l-4 border-l-blue-600 mb-4 md:mb-8">
                  {item.title}
                </h2>

                <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4 lg:grid-cols-6 lg:gap-6">
                  {item.categories.map((game, idx) => (
                    <div
                      key={idx}
                      className="bg-white shadow rounded-lg md:rounded-2xl p-1 md:p-2 hover:shadow-lg cursor-pointer transition-all"
                    >
                      <div
                        className="w-full h-auto bg-gray-200 rounded-lg"
                        style={{ aspectRatio: "1 / 1" }}
                      >
                        <Image
                          src={game.imagePath}
                          alt={game.name}
                          width={300}
                          height={300}
                          loading="lazy"
                          decoding="auto"
                          className="rounded-lg"
                        />
                      </div>
                      <p
                        className="text-xs md:text-sm font-semibold text-gray-600 mt-1 md:mt-2 text-center"
                        style={{ minHeight: "40px" }}
                      >
                        {game.name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

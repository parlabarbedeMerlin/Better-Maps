import Button from "@/components/inputs/buttons/Button"
import axios from "axios"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import Link from "next/link"

export const getServerSideProps = async () => {
  const { data: places } = await axios.get(`${process.env.HOST_NAME}/api/places?limit=6&skip=0&filters={}`)

  return {
    props: places
  }
}
// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const Home = ({ places }) => (
  <main className={clsx("flex-1 flex flex-col justify-center items-center", dosis.className)}>
    <div className="bg-gradient-to-b from-emerald-500 to to-green-500 h-[70vh] w-full flex justify-center items-center">
      <h1 className="group w-full text-4xl md:text-8xl font-bold text-center text-white hover:font-normal transition-all duration-700">Discover new places<span className="italic font-normal text-xl md:text-4xl group-hover:font-extrabold transition-all duration-700"> to be !</span></h1>
    </div>
    <div className=" bg-gradient-to-b from-green-500 to-emerald-300 w-full pb-32 flex justify-center items-center">
      <ul className="w-11/12 sm:w-4/5 bg-white flex flex-col p-6 rounded-3xl gap-2 items-center">
        {places.map((place) => (
          // eslint-disable-next-line no-underscore-dangle
          <li key={place._id} className="group w-full">
            {/* eslint-disable-next-line no-underscore-dangle */}
            <Link href={`/places/${place._id}`} className="p-4 flex flex-col bg-white drop-shadow-md border border-gray-200 rounded-2xl gap-2 hover:bg-emerald-100 transition-all duration-300">
              <span className="md:text-xl font-extrabold">
                {place.placeName}
              </span>
              <span className="md:text-xl">
                {place.address}, {place.city},<br className="md:hidden" /> {place.zipCode}, {place.country}
              </span>
              <div className="flex justify-between flex-wrap">
                <span>Type: <span className="font-bold text-sm md:text-base">{place.type}</span></span>
                <span>Stars: <span className="font-bold text-sm md:text-base">{place.starRating}</span></span>
                <span>Price: <span className="font-bold text-sm md:text-base">{place.price}</span></span>
              </div>
            </Link>
          </li>
        ))
        }
        <li className="w-fit mt-5">
          <Button type="link" href="/places">
            See More
          </Button>
        </li>
      </ul>
    </div>
    <div className="bg-gradient-to-b from-emerald-300 via-green-400 to-emerald-500 w-full py-12 pt-20 flex flex-col items-center">
      <h2 className="group w-full text-5xl font-bold text-center text-white hover:font-normal transition-all duration-700">The concept</h2>
      <div className="w-11/12 sm:w-2/3 bg-white p-10 gap-2 rounded-2xl mt-12 text-xl flex flex-wrap justify-between leading-relaxed tracking-wide">
        <p className="w-full text-justify">
          Welcome to <span className="font-bold text-green-500">BetterMaps</span>! Here, within our expansive platform, you'll discover a multitude of new destinations awaiting your exploration. Whether you're seeking vibrant eateries, cozy cafes, exhilarating entertainment spots, tranquil retreats, or even productive workspaces, BetterMaps is your ultimate guide. But it doesn't end there - we encourage you to contribute your own favorite spots, enriching our community with hidden gems and beloved locales, all waiting to be shared with the world.
        </p>
      </div>
    </div>
  </main>
)

export default Home

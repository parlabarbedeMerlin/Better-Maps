import Button from "@/components/inputs/buttons/Button"
import axios from "axios"
import clsx from "clsx"
import { Dosis } from "next/font/google"

export const getServerSideProps = async () => {
  const { data: places } = await axios.get("https://better-maps.lcl.host:44392/api/places?limit=6")
  // console.log(places.places)

  return {
    props: places
  }
}
// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const Home = (props) => {
  const { places } = props.pageProps


  return (
    <main className={clsx("flex-1 flex flex-col justify-center items-center", dosis.className)}>
      <div className="bg-gradient-to-b from-emerald-500 to to-green-500 h-[70vh] w-full flex justify-center items-center">
        <h1 className="group w-full text-8xl font-bold text-center text-white hover:font-normal transition-all duration-700">Discover new places<span className="italic font-normal text-4xl group-hover:font-extrabold transition-all duration-700"> to be !</span></h1>
      </div>
      <div className=" bg-gradient-to-b from-green-500 to-emerald-200 w-full pb-5 flex justify-center items-center">
        <ul className="w-4/5 bg-white flex flex-col p-6 rounded-3xl gap-2 items-center">
          {/* <li className="w-full p-4 flex flex-col bg-white drop-shadow-md border border-gray-200 rounded-2xl gap-2">
            <span className="text-xl font-extrabold">
              Place Name Sample
            </span>
            <span className="text-xl">
              Sample Address, Sample City, Sample Zip Code, Sample Country
            </span>
            <div className="flex justify-between">
              <span>Type: <span className="font-bold">🍔 Restaurant</span></span>
              <span>Stars: <span className="font-bold">⭐️⭐️⭐️⭐️</span></span>
              <span>Price: <span className="font-bold">💵💵💵</span></span>
            </div>
          </li> */}
          {places.map((place) => (
            // eslint-disable-next-line no-underscore-dangle
            <li key={place._id} className="group w-full">
              {/* eslint-disable-next-line no-underscore-dangle */}
              <a href={`/place/${place._id}`} className="p-4 flex flex-col bg-white drop-shadow-md border border-gray-200 rounded-2xl gap-2 hover:bg-emerald-100 transition-all">
                <span className="text-xl font-extrabold">
                  {place.placeName}
                </span>
                <span className="text-xl">
                  {place.address}, {place.city}, {place.zipCode}, {place.country}
                </span>
                <div className="flex justify-between">
                  <span>Type: <span className="font-bold">{place.type}</span></span>
                  <span>Stars: <span className="font-bold">{place.stars}</span></span>
                  <span>Price: <span className="font-bold">{place.price}</span></span>
                </div>
              </a>
            </li>
          ))
          }
          <li className="w-fit mt-5">
            <Button
              type="link"
              href="/places"
            >
              See More
            </Button>
          </li>
        </ul>
      </div>
      <div className="bg-gradient-to-b from-emerald-200 to-emerald-400 w-full py-12">
        <h2 className="group w-full text-5xl font-bold text-center text-white hover:font-normal transition-all duration-700">Find the perfect place <span className="italic font-normal text-3xl group-hover:font-extrabold transition-all duration-700"> to be !</span></h2>
      </div>

    </main>
  )
}

export default Home

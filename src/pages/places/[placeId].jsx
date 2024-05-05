import Button from "@/components/inputs/buttons/Button"
import { useConnectionContext } from "@/context/connection"
import axios from "axios"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
export const getServerSideProps = ({ params: { placeId } }) => ({
  props: { placeId, }
})
const Place = ({ placeId }) => {
  const router = useRouter()
  const { connected } = useConnectionContext()
  const [place, setPlace] = useState({})
  const [owner, setOwner] = useState(false)
  useEffect(() => {
    axios.get(`/api/places/${placeId}`)
      .then(({ data }) => {
        // eslint-disable-next-line no-underscore-dangle
        delete data.place._id
        // eslint-disable-next-line no-underscore-dangle
        delete data.place.__v
        setPlace(data.place)
        setOwner(data.owner)
      })
  }, [placeId, owner])

  return (
    <main className={clsx("flex flex-1 flex-col items-center bg-gradient-to-b from-green-500 to-emerald-300", dosis.className)}>
      <h1 className="text-5xl font-bold my-16">Place</h1>
      <div className="w-full flex justify-center items-center">
        <section className="w-2/5 h-5/6 text-lg bg-white p-6 rounded-2xl">
          {!place || place.error && <p className="w-full text-center">Place not found</p>}
          {place.placeName && <h2 className="text-3xl font-bold">{place.placeName}</h2>}
          {place.address && (
            <p className="flex">
              Address : <span className="font-bold"> {place.address}</span>,
              {place.city && <span> {place.city}</span>},
              {place.zipCode && <span> {place.zipCode}</span>},
              {place.country && <span> {place.country}</span>}
            </p>)}
          {place.type && <p>Type: <span className="font-bold">{place.type}</span></p>}
          {place.starRating && <p>Stars: <span className="font-bold">{place.starRating}</span></p>}
          {place.price && <p>Price: <span className="font-bold">{place.price}</span></p>}
          {place.foodType && <p>Food Type: <span className="font-bold">{place.foodType}</span></p>}
          {place.typeOfArt && <p>Type of Art: <span className="font-bold">{place.typeOfArt}</span></p>}
          {place.artisticCurrent && <p>Artistic Current: <span className="font-bold">{place.artisticCurrent}</span></p>}
          {place.privacy && <p>Privacy: <span className="font-bold">{place.privacy}</span></p>}
          {place.parkType && <p>Park Type: <span className="font-bold">{place.parkType}</span></p>}
          {place.barType && <p>Bar Type: <span className="font-bold">{place.barType}</span></p>}
          {place.owner && <p>Owner: <span className="font-bold">{place.owner}</span></p>}
          <div className="w-full flex justify-center">
            {(connected && owner && <Button href={`${router.asPath}/edit`} className="my-4">Edit</Button>)}
          </div>
        </section>

      </div>
    </main>
  )
}
export default Place
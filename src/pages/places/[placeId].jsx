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
const Place = ({ pageProps: { placeId } }) => {
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
    <main className={clsx("flex flex-1 flex-col items-center bg-green-200", dosis.className)}>
      <h1 className="text-5xl font-bold my-16">Place</h1>
      <section className="w-5/6 h-5/6 text-lg bg-white p-6 rounded-2xl">
        {place && Object.keys(place).map((key) => (
          <p key={key}><span className="font-bold">{key}</span>: {place[key]}</p>
        ))}
      </section>
      <div className="w-5/6 flex justify-center">
        <p>{owner}</p>
        {(connected && owner && <Button href={`${router.asPath}/edit`} className="my-4">Edit</Button>)}
      </div>
    </main>
  )
}
export default Place
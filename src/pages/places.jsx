import axios from "axios"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import Button from "../components/inputs/buttons/Button"

// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const Places = () => {
  const [skip, setSkip] = useState(0)
  const [limit] = useState(10000)
  const [count, setCount] = useState(0)
  const { isLoading, error, data, refetch } = useQuery(["places", skip], () => axios.get(`/api/places?skip=${skip}&limit=${limit}`).then((res) => {
    setCount(res.data.count)

    return res.data
  })
  )
  const nextPage = () => {
    setSkip((prev) => prev + limit)
  }
  const prevPage = () => {
    setSkip((prev) => prev - limit)
  }
  useEffect(() => {
    refetch()
  }, [skip, limit, count, refetch])

  return (
    <div className={clsx("bg-gradient-to-b from-green-500 to-emerald-200 w-full pb-20 flex flex-col flex-1 justify-start items-center", dosis.className)}>
      <h1 className="group w-full text-6xl font-bold text-center text-white hover:font-normal transition-all duration-700 my-24">Explore new places</h1>
      {error && <p>Error: {error.message}</p>}
      <ul className="w-4/5 bg-white flex flex-col p-6 rounded-3xl gap-2 items-center">
        {isLoading && <p>Loading...</p>}
        {data && data.places && data.places.map((place) => (
          // eslint-disable-next-line no-underscore-dangle
          <li key={place._id} className="group w-full">
            {/* eslint-disable-next-line no-underscore-dangle */}
            <a href={`/places/${place._id}`} className="p-4 flex flex-col bg-white drop-shadow-md border border-gray-200 rounded-2xl gap-2 hover:bg-emerald-100 transition-all">
              <span className="text-xl font-extrabold">
                {place.placeName}
              </span>
              <span className="text-xl">
                {place.address}, {place.city}, {place.zipCode}, {place.country}
              </span>
              <div className="flex justify-between">
                <span>Type: <span className="font-bold">{place.type}</span></span>
                <span>Stars: <span className="font-bold">{place.starRating}</span></span>
                <span>Price: <span className="font-bold">{place.price}</span></span>
              </div>
            </a>
          </li>
        ))
        }
        <li className="w-full flex justify-between items-center mt-4">
          <Button type="button" onClick={prevPage} disabled={skip === 0} className="disabled:bg-slate-200 disabled:hover:bg-slate-800 disabled:cursor-not-allowed">Previous</Button>
          <span>
            Page {skip / limit + 1} of {Math.ceil(count / limit)}
          </span>
          <Button type="button" onClick={nextPage} disabled={skip + limit >= count} className="disabled:bg-slate-200 disabled:hover:bg-slate-800 disabled:cursor-not-allowed">Next</Button>
        </li>
      </ul>
    </div>
  )
}

export default Places
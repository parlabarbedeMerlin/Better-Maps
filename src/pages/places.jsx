import FilterSelect from "@/components/inputs/fields/filterSelect"
import { ArtisticCurrents, BarTypes, FoodTypes, ParkTypes, Prices, Privacys, Stars, Types, TypesOfArt } from "@/utils/config"
import axios from "axios"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import Button from "../components/inputs/buttons/Button"

// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
// eslint-disable-next-line max-lines-per-function
const Places = () => {
  const [type, setType] = useState("")
  const [filters, setFilters] = useState({})
  const [skip, setSkip] = useState(0)
  const [limit] = useState(30)
  const [count, setCount] = useState(0)
  const { isLoading, error, data, refetch } = useQuery(["places", skip, filters], () => axios.get(`/api/places?skip=${skip}&limit=${limit}&filters=${JSON.stringify(filters)}`).then((res) => {
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
  const setFilter = (e) => {
    console.log(e.target.name)
    setSkip(0)

    if (e.target.name === "type") {
      setType(e.target.value)
      const newFilters = {
        type: e.target.value,
      }

      if (filters.starRating) {
        newFilters.starRating = filters.starRating
      }

      if (filters.price) {
        newFilters.price = filters.price
      }

      if (e.target.value === "All") {
        const newFilters2 = {}
        Object.keys(filters).forEach((key) => {
          if (key !== e.target.name) {
            newFilters2[key] = filters[key]
          }
        })

        setFilters(newFilters2)

        return
      }


      setFilters(newFilters)

      return
    }


    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const clearFilters = () => {
    setFilters({})
    setType("")

    const selects = document.querySelectorAll("select")
    selects.forEach((select) => {
      select.value = "All"
    })
  }
  const assignFilters = () => {
    const selects = document.querySelectorAll("select")
    selects.forEach((select) => {
      select.value = filters[select.name] || "All"
    })
  }

  useEffect(() => {
    assignFilters()
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit, count, refetch])

  return (
    <div className={clsx("bg-gradient-to-b from-green-500 to-emerald-200 w-full pb-20 flex flex-col flex-1 justify-start items-center", dosis.className)}>
      <h1 className="group w-full text-6xl font-bold text-center text-white hover:font-normal transition-all duration-700 my-24">Explore new places</h1>
      {error && <p>Error: {error.message}</p>}
      <div className="w-4/5 bg-white flex flex-col p-6 rounded-3xl my-10">
        <h2 className="font-bold text-xl">Filters</h2>
        <div className="flex flex-row gap-4 items-center">
          <FilterSelect name="type" label="Type" options={Types} setFilter={setFilter} />
          <FilterSelect name="starRating" label="Stars" options={Stars} setFilter={setFilter} />
          <FilterSelect name="price" label="Price" options={Prices} setFilter={setFilter} />
          {(type === "🍔 Restaurant") && (<FilterSelect name="foodType" label="Food Type" options={FoodTypes} setFilter={setFilter} />)}
          {(type === "🏛 Museum") && (
            <>
              <FilterSelect name="typeOfArt" label="Type of Art" options={TypesOfArt} setFilter={setFilter} />
              <FilterSelect name="artisticCurrent" label="Artistic Current" options={ArtisticCurrents} setFilter={setFilter} />
            </>
          )}
          {(type === "🌳 Park") && (
            <>
              <FilterSelect name="privacy" label="Privacy" options={Privacys} setFilter={setFilter} />
              <FilterSelect name="parkType" label="Park Type" options={ParkTypes} setFilter={setFilter} />
            </>
          )}
          {(type === "🍺 Bar") && (<FilterSelect name="barType" label="Bar Type" options={BarTypes} setFilter={setFilter} />)}
        </div>
        <div className="flex mt-5 items-center justify-between">
          <h3 className="text-xl font-bold">
            {count} - places found
          </h3>
          <Button type="button" onClick={clearFilters} variant="caution">Clear Filters</Button>
        </div>
      </div>
      <ul className="w-4/5 bg-white flex flex-col p-6 rounded-3xl gap-2 items-center">
        {isLoading && <p>Loading...</p>}
        {data && data.places && data.places.map((place) => (
          // eslint-disable-next-line no-underscore-dangle
          <li key={place._id} className="group w-full">
            {/* eslint-disable-next-line no-underscore-dangle */}
            <Link href={`/places/${place._id}`} className="p-4 flex flex-col bg-white drop-shadow-md border border-gray-200 rounded-2xl gap-2 hover:bg-emerald-100 transition-all">
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
            </Link>
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
import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { dateformate } from '../lib/dateformate'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const timeFormat = (minutes) => {
    if (!minutes) return "N/A"
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h > 0 ? `${h}h ` : ""}${m > 0 ? `${m}m` : ""}`
  }

  const getMyBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" right="600px" />
      </div>
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between 
          bg-red-500/8 border border-red-600/20 rounded-lg mt-4 p-2 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row">
            <img
              src={item.show.movie.poster_path}
              alt={item.show.movie.title}
              className="md:max-w-[180px] aspect-video h-auto object-cover object-bottom rounded"
            />
            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold">{item.show.movie.title}</p>
              <p className="text-gray-400 text-sm">
                {timeFormat(item.show.movie.runtime)}
              </p>
              <p className="text-gray-400 text-sm mt-auto">
                {dateformate(item.show.showDateTime)}
              </p>
            </div>
          </div>

        <div className='flex flex-col md:items-end md:text-right justify-between p-4'> 
        <div className='flex items-center gap-4'>
        <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
        {!item.isPaid && <button className='bg-red-500 px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}
        </div>
        <div className='text-sm'>
        <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length} </p>
        <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")} </p>

        </div>

        </div>

        </div>
      ))}
    </div>
  ) : (
    <Loading />
  )
}

export default MyBookings

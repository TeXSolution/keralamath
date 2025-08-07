import React from 'react'

const Car = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80">
        <img
          className="rounded-lg mb-4"
          src="https://images.unsplash.com/photo-1571607387784-7b4470a7dc4d"
          alt="Car"
        />
        <h2 className="text-xl font-bold mb-2">Tesla Model S</h2>
        <p className="text-gray-600 mb-4">
          Electric performance car with sleek design and powerful features.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  )
}

export default Car

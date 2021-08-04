/* This example requires Tailwind CSS v2.0+ */
import { Link } from 'react-router-dom';
import AllRecords from './AllRecords.jsx'
import axios from 'axios'
import { useState } from 'react';
export default function Home() {
    const [userData, setUserData] = useState('')
    const handleClick = () => {
        console.log('hoiioooooooo')
        axios.get('http://localhost:5000/allData')
            .then((res) => {
                console.log(res.data.data)
                setUserData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <div className=" md:items-center md:justify-between bg-gray-700 py-10">
                <div className="md:flex px-10 justify-center">
                    <div className="mt-4 flex md:mt-0 md:ml-4 ">
                        <button onClick={handleClick}
                            type="button"
                            className="inline-flex  items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                        >
                            All Records
                        </button>
                        <Link to="register">
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                            >
                                Add Member
                            </button></Link>
                    </div>
                </div>
            </div>
            <AllRecords data={userData} />
        </>
    )
}
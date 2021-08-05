import axios from 'axios';
import { useEffect, useState } from 'react';


export default function AllRecords({ data }) {

    const [allUsers, setUsersData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then((res) => {
                console.log(res.data)
                setUsersData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (

        <div className="">

            <div className="">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {allUsers.map((person, index) => (
                        <li
                            key={index}
                            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                        >
                            <div className="flex-1 flex flex-col p-8">
                                <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src={`http://localhost:5000/static/${person.profileImage.filename}`} alt="" />
                                <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.FullName}</h3>
                                <dl className="mt-1 flex-grow flex flex-col justify-between">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="text-gray-500 text-sm">{person.userName}</dd>
                                    <dd className="text-gray-500 text-sm">{person.zipCode}</dd>
                                </dl>
                            </div>
                            <div>

                            </div>
                        </li>
                    ))}

                </ul>

            </div>


        </div>
    )
}
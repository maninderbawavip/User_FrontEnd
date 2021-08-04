/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { useState } from 'react';


export default function AllRecords({ data }) {
    const [ ingData , setIngData] = useState('')
    axios.get('http://localhost:5000/Img')
        .then((res) => {
            console.log("res.data._id:", res.data.data)
            setIngData(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    return (

        <div className="">
            {
                data != '' ? (
                    <div className="">
                        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {data.data.map((person) => (
                                <li
                                    key={person.email}
                                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                                >
                                    <div className="flex-1 flex flex-col p-8">
                                        <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src={person} alt="" />
                                        <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.FullName}</h3>
                                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                                            <dt className="sr-only">Title</dt>
                                            <dd className="text-gray-500 text-sm">{person.userName}</dd>
                                            <dd className="text-gray-500 text-sm">{person.phone}</dd>
                                            <dd className="text-gray-500 text-sm">{person.zipCode}</dd>
                                            <dt className="sr-only">Role</dt>
                                            <dd className="mt-3">
                                                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                                    {person.email}
                                                </span>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div>

                                    </div>
                                </li>
                            ))}

                        </ul>

                    </div>
                ) : ''
            }
        </div>
    )
}
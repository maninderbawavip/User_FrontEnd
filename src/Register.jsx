import axios from 'axios'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


export default function Register() {

    const histroy = useHistory()
    const [error, setError] = useState('')
    const [errors, setErrors] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFileRefrence, setSelectedFileRefrence] = useState(null)


    const handleFile = (file) => {
        const formImgData = new FormData();
        formImgData.append('file', file)
        setSelectedFile(URL.createObjectURL(file))
        axios.post('http://localhost:5000/userImage', formImgData)
            .then((res) => {
                console.log("res.data._id:", res)
                setSelectedFileRefrence(res.data.data._id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getErrorsIfAny = (data) => {
        let errors = [];
        if (selectedFileRefrence === null) {
            errors.push('Please select profile pic')
        }
        if (data.password !== data.Confirmpassword) {
            errors.push('Passwords Do Not Match!!!')
        }
        if (data.FullName.length < 4) {
            errors.push('Name must be greater than 3 digits')
        }
        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {}
        const formInputData = new FormData(e.currentTarget);
        for (let [key, value] of formInputData.entries()) {
            data[key] = value
        }

        let errors = getErrorsIfAny(data)
        setErrors(errors)

        if (errors.length === 0) {
            const finalData = {
                FullName: data.FullName,
                userName: data.userName,
                password: data.password,
                zipCode: data.zipCode,
                profileImage: selectedFileRefrence,
            }
            axios.post('http://localhost:5000/users', finalData)
                .then((res) => {
                    histroy.push("/")
                })
                .catch((err) => {
                    console.log(err)
                    setError('Some Error occured')
                })
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    <div>
                        {selectedFile && <img src={selectedFile} alt="" />}
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Profile Pic
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                type="file"
                                autoComplete="current-password"
                                onChange={(e) => handleFile(e.target.files[0])}
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="FullName"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                User Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="userName"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="Confirmpassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Zip Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="zipCode"
                                    type="number"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            {<div className="text-red">{error}</div>}
                            {errors.map(err => <div className="text-red-500">{err}</div>)}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
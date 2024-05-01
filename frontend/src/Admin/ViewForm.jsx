import { useEffect, useState } from 'react';
import { getFeedback } from '../api';
import { toast } from 'react-toastify';

const ViewForm = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFeedback();
                if (data?.data?.status === true) setForms(data?.data?.feedback);
                else toast.error(data?.data?.msg);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mt-8 mb-4">View Forms</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {forms.map((form) => (
                    <div key={form._id} className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-2">{form.name}</h2>
                        <p className="text-gray-600 mb-4">{form.subject}</p>
                        <p className="text-gray-500 mb-4">{form.message}</p>
                        <div className="flex justify-end">
                            <button className="text-red-500 font-semibold mr-4">Delete</button>
                            <button className="text-blue-500 font-semibold">View</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewForm;

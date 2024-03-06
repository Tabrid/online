import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";
const NidOrder = () => {
    const [nid, setNid] = useState('');
    const [dob, setDob] = useState('');
    const { refresh , setRefresh, balance  } = useAuthContext();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nidNumber:nid, birthday:dob };
        if (balance < 130) {
            toast.error('Insufficient balance!');
        }
        else{
            fetch('/api/apply/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    fetch('/api/users/update-balance', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ balance: 130 }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                            toast.success('Order placed successfully!');
                            setRefresh(!refresh);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            toast.error('Something went wrong!');
                        });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Something went wrong!');
            });
        }
    };
    return (
        <div>
            <div className="max-w-md mx-auto mt-8">
                <h2 className="text-xl font-bold mb-4">Order Form</h2>
                <Marquee>
                <h2 className="text-xl font-bold mb-4">💢আপনার একাউন্ট থেকে 130tk কেটে নেয়া হবে ।💢</h2>
                </Marquee>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nid" className="block text-sm font-medium text-gray-700">NID Number</label>
                        <input
                            type="text"
                            id="nid"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            value={nid}
                            onChange={(e) => setNid(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NidOrder;
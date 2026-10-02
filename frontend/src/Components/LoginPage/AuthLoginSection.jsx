import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function AuthLoginSection() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/login", {
                email: form.email,
                password: form.password
            },
                {
                    withCredentials: true
                })

            if (response.data.success) {
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
            console.log(error);
        }

    }
    return (<>
        <div >
            <div className='bg-white rounded-md border-1 border-[#dde8d4] p-4 mb-5  bg-[#ffffff] text-base text[#333]'>
                <h1 className=' text-sm md:text-xl font-medium text-[#1a3d0a] mb-2' >
                    Welcome back!
                </h1>
                <p className='text-sm md:text-base text-[#999] mb-3'>
                    Login to continue shopping fresh
                </p>
                <div>
                    {error && <p className='text-red-500 font-medium  text-xs md:text-base'>{error}</p>}
                    <form >
                        <div style={{ marginBottom: "16px" }}>
                            <label className=' w-full text-[#666] font-medium' >
                                Email address</label>
                            <input type="email"
                                name="email" placeholder="you@example.com"
                                className='rounded-md bg-[#323331] text-white px-2 text-sm border-1 border-[#dde8d4]'
                                style={{ width: "70%" }}
                                onChange={handleChange} />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label className='  w-full text-[#666] font-medium' >Password</label>
                            <input type="password"
                                name="password"
                                placeholder="••••••••"
                                className='rounded-md bg-[#323331] text-white px-2 text-sm border-1 border-[#dde8d4]'
                                style={{ width: "70%" }}
                                onChange={handleChange} />
                        </div >
                        <button
                            type="submit"
                            className='px-3 bg-[#2d5a1b] text-white text-base font-medium pointer mb-2 py-2'
                            style={{
                                width: "30%", border: "none", borderRadius: "10px",
                            }}
                            onClick={handleLogin}>
                            Login
                        </button>

                    </form>
                    <p style={{ textAlign: "center", fontSize: "13px", color: "#999", marginTop: "10px" }}>
                        New here?{" "}
                        <span className='font-medium text-base pointer text-[#2d5a1b]'>
                            Create a free account →
                        </span>
                    </p>
                    <div className='flex justify-end' >
                        <img src="/media/grains.png" alt="crop" style={{ position: 'relative', width: "70%" }} />
                    </div>
                </div>

            </div>
        </div>


    </>);
}

export default AuthLoginSection;
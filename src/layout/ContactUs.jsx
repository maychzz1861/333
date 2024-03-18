import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

function ContactUs() {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const hdlChange = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const hdlSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
    }

    return (
        <div className="navbar-container">
        <div className="navbar bg-gradient-to-r from-orange-200 via-red-300 to-red-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        
       <div className="flex-1">
          <NavLink to="/" className="mx-16" activeClassName="text-red-600">
            <div className="logoG" />
          </NavLink>
          <NavLink exact to="/header" className="mx-6 font-semibold">หน้าหลัก</NavLink>
          <NavLink to="/about" className="mx-6 font-semibold" activeClassName="text-red-600 ">เกี่ยวกับเรา</NavLink>
          <NavLink to="/pizzas" className="mx-6 font-semibold" activeClassName="text-red-600 ">เมนู</NavLink>
          <NavLink to="/contact" className="mx-6 font-semibold" activeClassName="text-red-600 " style={{ color: '#dc2626' }}>ติดต่อเรา</NavLink>
        </div>
        <div className="indicator mr-1">
          <NavLink to="/login" className="flex items-center mx-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="red" />
            </svg>
          </NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <NavLink to="/login" className="green-button mx-2">เข้าสู่ระบบ</NavLink>
            </li>
            <li>
              <NavLink to="/register" className="green-button mx-3">สร้างบัญชี</NavLink>
            </li>
          </ul>
        </div>
      </div>
            <div className="background-containerC relative flex flex-col justify-center h-screen p-8">
    <h1 className="text-white text-6xl font-semibold text-center mb-6" style={ { color: '#dc2626', marginTop: '50px' }}>ติดต่อเรา</h1>
    <p className="text-white text-lg font-semibold text-center mb-3">
        อย่าลังเลที่จะติดต่อเราเมื่อไรก็ตามที่คุณต้องการ
    </p>
    <p className="text-white text-lg font-semibold text-center mb-8">
        ความช่วยเหลือเราจะตอบกลับคำถามของคุณโดยเร็วที่สุด
    </p>
    <form className="mx-auto max-w-lg">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <input
                type="text"
                className="input input-bordered w-full"
                name="firstName"
                placeholder="ชื่อ"
                value={input.firstName}
                onChange={hdlChange}
            />
        </div>
        <div>
            <input
                type="text"
                className="input input-bordered w-full"
                name="lastName"
                placeholder="นามสกุล"
                value={input.lastName}
                onChange={hdlChange}
            />
        </div>
    </div>
    <div className="mt-4">
        <input
            type="email" 
            className="input input-bordered w-full"
            name="email" 
            placeholder="อีเมล์"
            value={input.email} 
            onChange={hdlChange} 
        />
    </div>
    <div className="mt-4">
        <textarea
            id="message"
            className="textarea textarea-bordered w-full"
            name="message"
            rows="4"
            placeholder="กรอกข้อความที่ต้องการส่ง"
            value={input.message}
            onChange={hdlChange}
        ></textarea>
    </div>
    <div className="mt-4 flex justify-end">
    <button type="submit" className="btn btn-success px-2 py-1">ส่งข้อความ</button>
</div>



</form>

</div>
</div>
)}
export default ContactUs;

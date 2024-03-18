import axios from 'axios';
import { useState } from "react";
import '../layout/styles.css';

// สร้างคอมโพเนนต์ RegisterForm ซึ่งเป็นแบบฟอร์มสำหรับลงทะเบียน
export default function RegisterForm() {
  // กำหนดค่าเริ่มต้นของข้อมูลที่ใช้ในฟอร์ม
  const initialInputState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '', // MALE/FEMALE
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  };

  // สร้าง state สำหรับเก็บข้อมูลในฟอร์ม
  const [input, setInput] = useState(initialInputState);

  // ฟังก์ชันสำหรับจัดการเมื่อมีการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // ฟังก์ชันสำหรับการส่งข้อมูลฟอร์ม
  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // ตรวจสอบความถูกต้องของข้อมูล
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      // ส่งคำขอลงทะเบียนผ่าน API
      const rs = await axios.post('http://localhost:8000/auth/register', input);
      console.log(rs);
      if (rs.data.msg === 'Registration successful') {
        alert('Register Successful');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
  const resetForm = () => {
    setInput(initialInputState);
  };

  return (
    <div className="background-container1">
      <div className="background-container relative flex items-center justify-center h-screen">
        {/* Language switch */}
        <div className="language-switch absolute top-0 right-0 mt-10 mr-10">
          <div className="logo mt-30 " />
        </div>
        {/* แบบฟอร์มสำหรับลงทะเบียน */}
        <div className="login-border1 p-5 rounded mt-5">
          <div className="text-3xl mb-5 center">สร้างบัญชี</div>

          <div className="register-link1">
            <a href="/login">มีบัญชีอยู่แล้วใช่หรือไม่</a>
          </div>

          <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
            {/* ฟิลด์ข้อมูลสำหรับกรอกข้อมูล */}
            <div className="flex space-x-4">
              {/* ชื่อ */}
              <div className="form-control" style={{ textAlign: 'left', marginRight: '129px', maxWidth: '15rem' }}>
                <label className="label"></label>
                <div className="flex items-center" >
                  {/* ไอคอน */}
                  <svg className="w-8 h-8 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z" clip-rule="evenodd" />
                  </svg>
                  {/* ฟิลด์ข

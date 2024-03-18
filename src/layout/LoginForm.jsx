import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth'; // นำเข้าการใช้งาน hook useAuth จากไฟล์ useAuth.js
import '../layout/styles.css';

// สร้างคอมโพเนนต์ LoginForm สำหรับแสดงและจัดการข้อมูลการเข้าสู่ระบบ
export default function LoginForm() {
  const { setUser } = useAuth(); // เรียกใช้ hook useAuth เพื่อเข้าถึงฟังก์ชัน setUser
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const [language, setLanguage] = useState('THAI'); // สร้าง state เพื่อเก็บภาษาที่เลือก

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // ฟังก์ชันสำหรับการส่งคำขอเข้าสู่ระบบ
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: input.email,
        password: input.password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      // ส่งคำขอเพื่อขอข้อมูลผู้ใช้
      const userResponse = await axios.get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // กำหนดข้อมูลผู้ใช้ใน context
      setUser(userResponse.data);
      // ให้ใช้งานหน้าหลักของผู้ดูแลหรือผู้ใช้ทั่วไปตามบทบาทของผู้ใช้
      if (userResponse.data.role === 'ADMIN') {
        window.location = '/header'; // หน้าหลักสำหรับผู้ดูแลระบบ
      } else {
        window.location = '/header'; // หรือ URL ของหน้าหลักสำหรับผู้ใช้ทั่วไปอื่นๆ ที่ต้องการ
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // ฟังก์ชันสำหรับเปลี่ยนภาษา
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="background-container relative flex items-center justify-center h-screen">
      <div className="language-switch absolute top-0 right-0 mt-10 mr-10">
        {/* ปุ่มสลับภาษา */}
        <button onClick={() => handleLanguageChange('THAI')}>
          TH<span> | </span>
        </button>
        <button onClick={() => handleLanguageChange('ENGLISH')}>
          EN
        </button>
        <div className="logo mt-30 " />
      </div>

      <div className="login-border p-5 rounded mt-5">
        <div className="login-logo mb-5"></div>
        {/* แสดงข้อความเข้าสู่ระบบ โดยสลับภาษาได้ */}
        <div className="login">{language === 'THAI' ? 'เข้าสู่ระบบ' : 'Login'}</div>
        <form className="flex flex-col gap-2 form-container" onSubmit={handleSubmit}>
          {/* ฟิลด์อีเมล */}
          <label className="form-control">
            <div className="flex items-center">
              <input
                type="text"
                className="input input-bordered"
                name="email"
                placeholder={language === 'THAI' ? 'อีเมล' : 'Email'}
                value={input.email}
                onChange={handleChange}
              />
            </div>
          </label>

          {/* ฟิลด์รหัสผ่าน */}
          <label className="form-control">
            <div className="flex items-center">
              <input
                type="password"
                className="input input-bordered"
                name="password"
                placeholder={language === 'THAI' ? 'รหัสผ่าน' : 'Password'}
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </label>
          {/* ลิงก์สำหรับสร้างบัญชีใหม่ */}
          <div className="register-link2">
            <a href="/register">{language === 'THAI' ? 'สร้างบัญชีใหม่?' : 'New account'}</a>
          </div>

          {/* ปุ่มเข้าสู่ระบบ */}
          <div className="form-actions">
            <button className="btn btn-success">{language === 'THAI' ? 'เข้าสู่ระบบ' : 'Login'}</button>
          </div>
          {/* ลิงก์กลับหน้าหลัก */}
          <div className="link3">
            <a href="/header">{language === 'THAI' ? 'กลับหน้าหลัก' : 'Back to home'}</a>
          </div>
        </form>
      </div>
    </div>
  );
}

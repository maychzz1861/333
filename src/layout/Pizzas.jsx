import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// สร้างคอมโพเนนต์ Pizzas ซึ่งเป็นหน้าเมนูพิซซ่า
export default function Pizzas() {
  // สร้าง state สำหรับเก็บข้อมูลพิซซ่าทั้งหมด
  const [pizzas, setPizzas] = useState([]);

  // สร้าง state สำหรับเก็บหน้าปัจจุบัน
  const [currentPage, setCurrentPage] = useState(1);

  // สร้าง state สำหรับเก็บคำค้นหา
  const [searchQuery, setSearchQuery] = useState('');

  // สร้าง state สำหรับเก็บประเภทของขอบแป้ง
  const [crustType, setCrustType] = useState('');

  // สร้าง state สำหรับเก็บขนาดของพิซซ่า
  const [size, setSize] = useState('');

  // สร้าง state สำหรับเก็บข้อมูลพิซซ่าที่ผ่านการกรอง
  const [filteredPizzas, setFilteredPizzas] = useState([]);

  // สร้าง state สำหรับเก็บจำนวนหน้าทั้งหมด
  const [totalPages, setTotalPages] = useState(0);

  // เรียกใช้ useEffect เพื่อดึงข้อมูลพิซซ่าเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pizzas');
        setPizzas(response.data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchPizzas();
  }, []);

  // ใช้ useEffect เพื่อกรองพิซซ่าเมื่อมีการเปลี่ยนแปลงคำค้นหาหรือตัวกรองอื่นๆ
  useEffect(() => {
    // กรองรายการพิซซ่าตามคำค้นหา ประเภทของขอบแป้ง และขนาด
    const filtered = pizzas.filter(pizza =>
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (crustType === '' || pizza.crustType === crustType) &&
      (size === '' || pizza.size === size)
    );
    setFilteredPizzas(filtered);

    // คำนวณจำนวนหน้าทั้งหมด
    setTotalPages(Math.ceil(filtered.length / 6));
  }, [searchQuery, crustType, size, pizzas]);

  // ฟังก์ชันสำหรับเลื่อนไปหน้าถัดไป
  const nextPage = () => {
    const totalPages = Math.ceil(filteredPizzas.length / 6);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ฟังก์ชันสำหรับเลื่อนไปหน้าก่อนหน้า
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // คำนวณดัชนีเริ่มต้นและสิ้นสุดของรายการพิซซ่าในหน้าปัจจุบัน
  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const currentPizzas = filteredPizzas.slice(startIndex, endIndex);

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงคำค้นหา
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงประเภทของขอบแป้ง
  const handleCrustChange = (e) => {
    setCrustType(e.target.value);
  };

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงขนาดของพิซซ่า
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar-container">
        {/* Navbar content */}
      </div>

      {/* Background */}
      <div className="background-containerMenu flex flex-col h-screen"></div>

      {/* Title */}
      <div className="botIcon">
        <h1 className="btn btn-outline btn-error">Pizza Vanta</h1>
      </div>

      {/* Main content */}
      <div className="background-containerMenu2 relative flex flex-col justify-center" style={{ minHeight: '100vh' }}>
        {/* Search box */}
        <div className="searchBox" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Search input */}
          {/* Crust type select */}
          {/* Size select */}
          {/* Search button */}
        </div>

        {/* Pizza list */}
        <div style={{ marginTop: '88px' }}>
          {/* Display pizzas */}
          {/* Display no result message if no pizzas */}
        </div>

        {/* Pagination */}
        <div className="join" style={{ position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)' }}>
          {/* Previous page button */}
          {/* Current page indicator */}
          {/* Next page button */}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        {/* Footer navigation */}
        {/* Social media links */}
        {/* Copyright */}
      </footer>
    </div>
  );
}

// Import React เพื่อใช้งานคอมโพเนนต์ของ React
import React from 'react';

// Import RouterProvider เพื่อใช้เป็นคอมโพเนนต์ที่ให้เรากำหนด Router ให้กับแอปพลิเคชัน
import { RouterProvider } from 'react-router-dom';

// Import useAuth เพื่อใช้เพื่อรับข้อมูลผู้ใช้จาก Context
import useAuth from '../hooks/useAuth';

// Import guestRouter เพื่อใช้เป็น Router สำหรับผู้ใช้ที่ยังไม่ล็อกอิน
import guestRouter from './guestRouter';

// Import userRouter เพื่อใช้เป็น Router สำหรับผู้ใช้ที่ล็อกอินแล้ว
import userRouter from './userRouter';

// Import adminRouter เพื่อใช้เป็น Router สำหรับผู้ดูแลระบบ
import adminRouter from './adminRouter';

// สร้างคอมโพเนนต์ AppRouter ซึ่งจะเป็นตัวกำหนด Router ของแอปพลิเคชัน
export default function AppRouter() {
  // ใช้ hook useAuth เพื่อรับข้อมูลผู้ใช้จาก Context
  const { user } = useAuth();

  // สร้างฟังก์ชัน determineRouter เพื่อตรวจสอบบทบาทของผู้ใช้และคืนค่า Router ที่เหมาะสมตามบทบาท
  const determineRouter = () => {
    // ถ้าไม่มีผู้ใช้ล็อกอิน ให้คืนค่า guestRouter
    if (!user?.id) {
      return guestRouter;
    } 
    // ถ้าผู้ใช้มีบทบาทเป็น Admin ให้คืนค่า adminRouter
    else if (user.role === 'Admin') {
      return adminRouter;
    } 
    // ถ้าผู้ใช้ไม่ใช่ Admin ให้คืนค่า userRouter
    else {
      return userRouter;
    }
  };

  // กำหนด Router สุดท้ายตามผลลัพธ์ที่ได้จากฟังก์ชัน determineRouter
  const finalRouter = determineRouter();

  // คืนค่า RouterProvider พร้อมกับกำหนด Router ที่ได้จากการตรวจสอบบทบาทของผู้ใช้
  return (
    <RouterProvider router={finalRouter} />
  );
}

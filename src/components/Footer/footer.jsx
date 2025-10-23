import React from "react";

const logo = '/logo-ladluang.png';

const Footer = () => {
  const thaiYear = new Date().getFullYear() + 543;
  return (
    <footer id="ติดต่อ" className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-white text-xl">
                <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              </span>
              <div>
                <div className="text-base font-semibold leading-5">เทศบาลเมืองลัดหลวง</div>
                <div className="text-xs text-gray-500 -mt-0.5">ศูนย์แจ้งเรื่องร้องเรียน</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">ที่อยู่ติดต่อราชการ</p>
            <p className="mt-1 text-sm text-gray-600">โทรศัพท์ | อีเมล</p>
            <p className="mt-1 text-sm text-gray-600">เวลาราชการ: จันทร์-ศุกร์ 08:30-16:30 น.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">ลิงก์ที่เกี่ยวข้อง</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="text-gray-700 hover:text-primary-700">ข้อมูลพื้นฐานเทศบาล</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary-700">คู่มือประชาชน</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary-700">กฎหมายและระเบียบ</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary-700">ข้อมูลงบประมาณ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">โซเชียลมีเดีย</h3>
            <div className="mt-3 flex gap-3">
              <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-700">f</a>
              <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-700">X</a>
              <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-700">▶</a>
              <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 text-primary-700">in</a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">© {thaiYear} เทศบาลเมืองลัดหลวง สงวนลิขสิทธิ์</p>
          <div className="text-xs text-gray-500">เวอร์ชันหน้าเว็บสาธิต</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

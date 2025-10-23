import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const newsData = {
    id: 'n1',
    title: 'การประชุมสภาเทศบาล สมัยสามัญ ครั้งที่ 3',
    category: 'ข่าวประชาสัมพันธ์',
    categoryColor: 'bg-green-500',
    date: '16 ตุลาคม 2568',
    views: 245,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    author: 'ฝ่ายประชาสัมพันธ์',
    content: `
      <p class="mb-4">เทศบาลเมืองลัดหลวง จัดการประชุมสภาเทศบาล สมัยสามัญ ครั้งที่ 3 ประจำปี 2568 เมื่อวันที่ 16 ตุลาคม 2568 เวลา 09.00 น. ณ ห้องประชุมสภาเทศบาล ชั้น 3 อาคารสำนักงานเทศบาลเมืองลัดหลวง</p>
      
      <p class="mb-4">โดยมี นายสมชาย ใจดี นายกเทศมนตรีเมืองลัดหลวง เป็นประธานในการประชุม พร้อมด้วยสมาชิกสภาเทศบาล ผู้บริหาร และหัวหน้าส่วนราชการ เข้าร่วมประชุมครั้งนี้</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">วาระการประชุมที่สำคัญ</h2>
      
      <p class="mb-4">การประชุมครั้งนี้มีวาระสำคัญหลายประการ ได้แก่</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>พิจารณาอนุมัติงบประมาณรายจ่ายเพิ่มเติม สำหรับโครงการพัฒนาโครงสร้างพื้นฐาน</li>
        <li>รายงานผลการดำเนินงานตามแผนพัฒนาท้องถิ่น ไตรมาสที่ 3</li>
        <li>พิจารณาร่างข้อบัญญัติเทศบาลว่าด้วยการจัดการขยะมูลฝอย</li>
        <li>เรื่องอื่นๆ ที่เกี่ยวข้องกับการพัฒนาท้องถิ่น</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-3">มติที่ประชุม</h2>
      
      <p class="mb-4">ที่ประชุมมีมติเห็นชอบในหลายประเด็น โดยเฉพาะการอนุมัติงบประมาณสำหรับโครงการซ่อมแซมถนนและทางเท้าในพื้นที่ชุมชน รวมถึงการจัดทำระบบระบายน้ำเพื่อแก้ไขปัญหาน้ำท่วมขัง</p>
      
      <p class="mb-4">นอกจากนี้ ที่ประชุมยังได้มีการหารือเกี่ยวกับแนวทางการพัฒนาเมืองอัจฉริยะ (Smart City) และการส่งเสริมการท่องเที่ยวเชิงวัฒนธรรมในพื้นที่</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">ข้อมูลเพิ่มเติม</h2>
      
      <p class="mb-4">ประชาชนสามารถติดตามรายละเอียดและมติที่ประชุมได้ที่เว็บไซต์เทศบาลเมืองลัดหลวง หรือสอบถามข้อมูลเพิ่มเติมได้ที่ฝ่ายประชาสัมพันธ์ โทร. 02-XXX-XXXX</p>
    `
  };

  const relatedNews = [
    {
      id: 'n2',
      title: 'โครงการส่งเสริมการออกกำลังกายเพื่อสุขภาพ',
      category: 'กิจกรรม',
      categoryColor: 'bg-blue-500',
      date: '15 ตุลาคม 2568',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'n3',
      title: 'ประกาศผลผู้ชนะการเสนอราคา',
      category: 'จัดซื้อจัดจ้าง',
      categoryColor: 'bg-yellow-500',
      date: '14 ตุลาคม 2568',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'n4',
      title: 'ประกาศเทศบาลให้ใช้ข้อบัญญัติงบประมาณ',
      category: 'ประกาศสำคัญ',
      categoryColor: 'bg-red-500',
      date: '13 ตุลาคม 2568',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับ
        </button>

        <article className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            <img
              src={newsData.image}
              alt={newsData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className={`inline-block ${newsData.categoryColor} text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4`}>
                {newsData.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{newsData.title}</h1>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {newsData.author}
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {newsData.date}
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {newsData.views} ครั้ง
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: newsData.content }}
            />

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">แชร์:</span>
                <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ข่าวที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedNews.map((news) => (
              <article
                key={news.id}
                onClick={() => navigate(`/news/${news.id}`)}
                className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-3 left-3 ${news.categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {news.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {news.title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    {news.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;

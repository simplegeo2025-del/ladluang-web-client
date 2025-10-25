import { useState } from 'react'

const ReportList = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [reports] = useState([
    {
      id: 'ISS-2025-00089',
      type: 'ไฟฟ้าดับ',
      date: '19/10/2025',
      status: 'new',
      progress: 15
    },
    {
      id: 'ISS-2025-00072',
      type: 'ท่อระบายน้ำอุดตัน',
      date: '18/10/2025', 
      status: 'wip',
      progress: 55
    },
    {
      id: 'ISS-2025-00055',
      type: 'ขยะตกค้าง',
      date: '16/10/2025',
      status: 'done',
      progress: 100
    },
    {
      id: 'ISS-2025-00044',
      type: 'สายสื่อสารรกรุงรัง',
      date: '15/10/2025',
      status: 'reject',
      progress: 100
    }
  ])

  const statusColors = {
    new: { bg: 'bg-amber-100', text: 'text-amber-700', progress: 'bg-amber-500', label: 'รอรับเรื่อง' },
    wip: { bg: 'bg-blue-100', text: 'text-blue-700', progress: 'bg-blue-500', label: 'กำลังดำเนินการ' },
    done: { bg: 'bg-green-100', text: 'text-green-700', progress: 'bg-green-600', label: 'เสร็จสิ้น' },
    reject: { bg: 'bg-red-100', text: 'text-red-700', progress: 'bg-red-500', label: 'ถูกปฏิเสธ' }
  }

  const filteredReports = reports
    .filter(report => activeTab === 'all' || report.status === activeTab)
    .filter(report => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return report.id.toLowerCase().includes(query) || report.type.toLowerCase().includes(query)
    })
    .filter(report => {
      if (!dateFilter) return true
      const [day, month, year] = report.date.split('/')
      const reportDate = new Date(`${year}-${month}-${day}`)
      const filterDate = new Date(dateFilter)
      return reportDate.toDateString() === filterDate.toDateString()
    })

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm border-t border-b ${
            currentPage === i ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white border rounded-lg p-4 sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700">ค้นหาเลขที่เรื่อง/คำสำคัญ</label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
                placeholder="เช่น ISS-2025-00001, ไฟฟ้าดับ" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">ช่วงวันที่</label>
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
          </div>
          <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button onClick={() => setActiveTab('all')} className={`px-3 py-2 text-sm rounded-md ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>ทั้งหมด</button>
            <button onClick={() => setActiveTab('new')} className={`px-3 py-2 text-sm rounded-md ${activeTab === 'new' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>รอรับเรื่อง</button>
            <button onClick={() => setActiveTab('wip')} className={`px-3 py-2 text-sm rounded-md ${activeTab === 'wip' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>กำลังดำเนินการ</button>
            <button onClick={() => setActiveTab('done')} className={`px-3 py-2 text-sm rounded-md ${activeTab === 'done' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>เสร็จสิ้น</button>
            <button onClick={() => setActiveTab('reject')} className={`px-3 py-2 text-sm rounded-md ${activeTab === 'reject' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>ถูกปฏิเสธ</button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เลขที่เรื่อง</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ประเภท</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่แจ้ง</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ความคืบหน้า</th>
                <th className="px-4 py-3"/>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{report.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{report.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{report.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${statusColors[report.status].bg} ${statusColors[report.status].text}`}>
                      {statusColors[report.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-40 bg-gray-100 rounded-full h-2">
                      <div className={`${statusColors[report.status].progress} h-2 rounded-full`} style={{ width: `${report.progress}%` }}></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href="#" className="text-sm text-green-700 hover:underline">ดูรายละเอียด</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            แสดง {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredReports.length)} จาก {filteredReports.length} รายการ
          </div>
          <div className="inline-flex rounded-md shadow-sm isolate">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-2 text-sm border rounded-l-md ${
                currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
              }`}
            >
              ก่อนหน้า
            </button>
            {renderPaginationButtons()}
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 text-sm border rounded-r-md ${
                currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
              }`}
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ReportList

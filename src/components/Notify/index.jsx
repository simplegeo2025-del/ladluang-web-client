import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

import Map from './Map'

const mockData = [
    { id: 'r1', title: 'ไฟถนนดับยาวตลอดซอย', type: 'ไฟฟ้าสาธารณะ', status: 'รอรับเรื่อง', lat: 13.7563, lng: 100.5018, date: '2025-10-19', photo: 'https://images.unsplash.com/photo-1447014421976-7fec21d26d86?q=80&w=640&auto=format&fit=crop', note: 'ไฟฟ้าแสงสว่างดับ', community: true },
    { id: 'r2', title: 'ทางเท้าชำรุดหน้าตลาดทุ่งฟ้า', type: 'ถนน/ทางเท้า', status: 'กำลังดำเนินการ', lat: 13.7411, lng: 100.5152, date: '2025-10-18', photo: 'https://images.unsplash.com/photo-1599554482669-08bd1f2b19eb?q=80&w=640&auto=format&fit=crop', note: 'ทางเท้าพังหลายจุด', community: false },
    { id: 'r3', title: 'ขยะตกค้างริมคลอง', type: 'ขยะ', status: 'เสร็จสิ้น', lat: 13.7304, lng: 100.5432, date: '2025-10-16', photo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=640&auto=format&fit=crop', note: 'กลิ่นและขยะสะสม', community: true },
    { id: 'r4', title: 'ท่อระบายน้ำอุดตัน', type: 'น้ำท่วม/ระบายน้ำ', status: 'กำลังดำเนินการ', lat: 13.7629, lng: 100.4932, date: '2025-10-17', photo: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=640&auto=format&fit=crop', note: 'น้ำท่วมขังหลังฝน', community: false },
    { id: 'r5', title: 'สายสื่อสารรกรุงรัง', type: 'สายสื่อสารรกรุงรัง', status: 'ปฏิเสธ', lat: 13.7487, lng: 100.5033, date: '2025-10-15', photo: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=640&auto=format&fit=crop', note: 'สายต่ำและยุ่งเหยิง', community: true }
]

const statusColor = {
    'รอรับเรื่อง': { tw: 'bg-amber-100 text-amber-700', stroke: '#f59e0b' },
    'กำลังดำเนินการ': { tw: 'bg-blue-100 text-blue-700', stroke: '#3b82f6' },
    'เสร็จสิ้น': { tw: 'bg-emerald-100 text-emerald-700', stroke: '#10b981' },
    'ปฏิเสธ': { tw: 'bg-rose-100 text-rose-700', stroke: '#ef4444' }
}

const typeEmoji = {
    'ถนน/ทางเท้า': '🛣️',
    'ขยะ': '🗑️',
    'น้ำท่วม/ระบายน้ำ': '💧',
    'ไฟฟ้าสาธารณะ': '💡',
    'สายสื่อสารรกรุงรัง': '📡'
}

const Notify = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [communityOnly, setCommunityOnly] = useState(false)
    const [filteredData, setFilteredData] = useState(mockData)
    const [selectedItem, setSelectedItem] = useState(null)

    const [kpiData, setKpiData] = useState({
        total: 0,
        totalAll: mockData.length,
        wait: 0,
        waitAll: 0,
        doing: 0,
        doingAll: 0,
        done: 0,
        doneAll: 0,
        remain: 0,
        remainAll: 0
    })

    useEffect(() => {
        const filtered = mockData.filter(item => {
            if (statusFilter && item.status !== statusFilter) return false
            if (typeFilter && item.type !== typeFilter) return false
            if (communityOnly && !item.community) return false
            if (searchTerm) {
                const searchBlob = `${item.title} ${item.type} ${item.status} ${item.note || ''}`.toLowerCase()
                if (!searchBlob.includes(searchTerm.toLowerCase())) return false
            }
            return true
        })

        setFilteredData(filtered)

        const waitCount = filtered.filter(x => x.status === 'รอรับเรื่อง').length
        const doingCount = filtered.filter(x => x.status === 'กำลังดำเนินการ').length
        const doneCount = filtered.filter(x => x.status === 'เสร็จสิ้น').length
        const remainCount = filtered.filter(x => x.status !== 'เสร็จสิ้น' && x.status !== 'ปฏิเสธ').length

        const waitAllCount = mockData.filter(x => x.status === 'รอรับเรื่อง').length
        const doingAllCount = mockData.filter(x => x.status === 'กำลังดำเนินการ').length
        const doneAllCount = mockData.filter(x => x.status === 'เสร็จสิ้น').length
        const remainAllCount = mockData.filter(x => x.status !== 'เสร็จสิ้น' && x.status !== 'ปฏิเสธ').length

        setKpiData({
            total: filtered.length,
            totalAll: mockData.length,
            wait: waitCount,
            waitAll: waitAllCount,
            doing: doingCount,
            doingAll: doingAllCount,
            done: doneCount,
            doneAll: doneAllCount,
            remain: remainCount,
            remainAll: remainAllCount
        })
    }, [searchTerm, statusFilter, typeFilter, communityOnly])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value)
    }

    const handleTypeFilter = (e) => {
        setTypeFilter(e.target.value)
    }

    const resetFilters = () => {
        setSearchTerm('')
        setStatusFilter('')
        setTypeFilter('')
        setCommunityOnly(false)
        setSelectedItem(null)
    }

    const toggleCommunity = () => {
        setCommunityOnly(!communityOnly)
    }

    const handleMarkerClick = (item) => {
        setSelectedItem(item)
        const element = document.getElementById(`li-${item.id}`)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    const handleListItemClick = (item) => {
        setSelectedItem(item)
    }

    return (
        <main className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-3 sm:p-4 mb-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                        <div className="lg:col-span-5">
                            <label className="relative block">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="ค้นหาเคสที่ร้อง/คำสำคัญ"
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                                <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
                            </label>
                        </div>
                        <div className="lg:col-span-3">
                            <select
                                value={statusFilter}
                                onChange={handleStatusFilter}
                                className="w-full rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">สถานะ: ทั้งหมด</option>
                                <option value="รอรับเรื่อง">สถานะ: รอรับเรื่อง</option>
                                <option value="กำลังดำเนินการ">สถานะ: กำลังดำเนินการ</option>
                                <option value="เสร็จสิ้น">สถานะ: เสร็จสิ้น</option>
                                <option value="ปฏิเสธ">สถานะ: ปฏิเสธ</option>
                            </select>
                        </div>
                        <div className="lg:col-span-3">
                            <select
                                value={typeFilter}
                                onChange={handleTypeFilter}
                                className="w-full rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">ประเภท: ทั้งหมด</option>
                                <option>ถนน/ทางเท้า</option>
                                <option>ขยะ</option>
                                <option>น้ำท่วม/ระบายน้ำ</option>
                                <option>ไฟฟ้าสาธารณะ</option>
                                <option>สายสื่อสารรกรุงรัง</option>
                            </select>
                        </div>
                        <div className="lg:col-span-1 flex gap-2 justify-start lg:justify-end">
                            <button
                                onClick={toggleCommunity}
                                className={`inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${communityOnly ? 'ring-2 ring-offset-2' : ''}`}
                            >
                                ชุมชน
                            </button>
                            <button
                                onClick={resetFilters}
                                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                ล้างตัวกรอง
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                    <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 inline-flex items-center justify-center">📊</div>
                        <div>
                            <div className="text-xs text-gray-500">รวม</div>
                            <div className="text-2xl font-semibold">{kpiData.total}</div>
                        </div>
                    </div>
                    <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 inline-flex items-center justify-center">📝</div>
                        <div>
                            <div className="text-xs text-gray-500">รอรับเรื่อง</div>
                            <div className="text-2xl font-semibold">{kpiData.wait}</div>
                        </div>
                    </div>
                    <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 inline-flex items-center justify-center">⚙️</div>
                        <div>
                            <div className="text-xs text-gray-500">กำลังดำเนินการ</div>
                            <div className="text-2xl font-semibold">{kpiData.doing}</div>
                        </div>
                    </div>
                    <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 inline-flex items-center justify-center">✅</div>
                        <div>
                            <div className="text-xs text-gray-500">เสร็จสิ้น</div>
                            <div className="text-2xl font-semibold">{kpiData.done}</div>
                        </div>
                    </div>
                    <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-700 inline-flex items-center justify-center">⏳</div>
                        <div>
                            <div className="text-xs text-gray-500">คงเหลือ</div>
                            <div className="text-2xl font-semibold">{kpiData.remain}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                    <section className="lg:col-span-8">
                        <div className="rounded-xl overflow-hidden ring-1 ring-gray-200 bg-white h-[70vh]">
                            <Map
                                selectedItem={selectedItem}
                                filteredData={filteredData}
                                statusColor={statusColor}
                                typeEmoji={typeEmoji}
                                onMarkerClick={handleMarkerClick}
                            />
                        </div>
                    </section>
                    <aside className="lg:col-span-4">
                        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 flex flex-col h-[70vh]">
                            <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                                <h2 className="text-base font-semibold text-gray-900">รายการปัญหา</h2>
                                <div className="text-xs text-gray-500">{filteredData.length} รายการ</div>
                            </div>
                            <div className="overflow-y-auto px-2 pb-2 flex-1">
                                <ul className="space-y-2 mt-2">
                                    {filteredData.map((item) => (
                                        <li
                                            key={item.id}
                                            id={`li-${item.id}`}
                                            className={`group rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50/40 p-2 flex gap-3 cursor-pointer ${selectedItem?.id === item.id ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}
                                            onClick={() => handleListItemClick(item)}
                                        >
                                            <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                                <img src={item.photo} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start gap-2">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</div>
                                                    <span className={`ml-auto inline-flex items-center justify-center h-5 min-w-[20px] rounded-full px-1.5 text-[11px] ${statusColor[item.status]?.tw || ''}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-600 flex items-center gap-2">
                                                    <span>{typeEmoji[item.type] || ''} {item.type}</span>
                                                </div>
                                                <div className="mt-1 text-[11px] text-gray-500">
                                                    พิกัด: {item.lat.toFixed(4)}, {item.lng.toFixed(4)} • {item.date}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default Notify

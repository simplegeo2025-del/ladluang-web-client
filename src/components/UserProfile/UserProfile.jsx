import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import useUserStore from '../../store/user.store'
import { Icon } from '@iconify/react'

const UserProfile = () => {
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    }
  })

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUser({
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: avatarPreview
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-green-500 to-green-700">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-4xl font-semibold text-gray-400">
                        {user?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-700 transition-colors"
                  >
                    <Icon icon="mdi:camera" width="20" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">โปรไฟล์ของฉัน</h1>
                <p className="text-gray-500 mt-1">จัดการข้อมูลส่วนตัวของคุณ</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <Icon icon="mdi:pencil" width="20" />
                  แก้ไขข้อมูล
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ
                  </label>
                  <input
                    {...register('firstName', { required: 'กรุณากรอกชื่อ' })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      !isEditing ? 'bg-gray-50' : 'bg-white'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    นามสกุล
                  </label>
                  <input
                    {...register('lastName', { required: 'กรุณากรอกนามสกุล' })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      !isEditing ? 'bg-gray-50' : 'bg-white'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล
                </label>
                <input
                  {...register('email')}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                />
                <p className="mt-1 text-xs text-gray-500">ไม่สามารถเปลี่ยนอีเมลได้</p>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <Icon icon="mdi:loading" width="20" className="animate-spin" />
                        กำลังบันทึก...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:check" width="20" />
                        บันทึกการเปลี่ยนแปลง
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setAvatarPreview(user?.avatarUrl || '')
                    }}
                    disabled={isLoading}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                </div>
              )}
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลเพิ่มเติม</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:calendar" width="20" className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">วันที่สมัครสมาชิก</p>
                    <p className="font-medium text-gray-900">25 ตุลาคม 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:file-document" width="20" className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">จำนวนเรื่องร้องเรียน</p>
                    <p className="font-medium text-gray-900">0 เรื่อง</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

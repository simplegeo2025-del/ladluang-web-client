import { Icon } from '@iconify/react'

const LoadingScreen = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin" />
          <div className="w-16 h-16 border-4 border-primary-600 rounded-full animate-spin absolute inset-0" style={{ animationDirection: 'reverse', clipPath: 'inset(0 0 50% 0)' }} />
          <Icon icon="mdi:google" className="absolute inset-0 m-auto w-8 h-8 text-primary-600" />
        </div>
        <p className="mt-4 text-gray-600 font-medium text-lg animate-pulse">
          {message || 'กำลังโหลด...'}
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen

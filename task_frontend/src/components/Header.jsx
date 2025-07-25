// components/Header.jsx
import { useAuth } from '../context/AuthContext'

const Header = ({ title, subtitle, buttonText, onButtonClick }) => {
  const { user } = useAuth()

  return (
    <div className="mb-8 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">{title}</h1>
        {subtitle && <p className="text-beige-700">{subtitle}</p>}
        {user && (
          <p className="text-sm text-beige-600 mt-2">
            Welcome back, {user.name}!
          </p>
        )}
      </div>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm text-sm font-medium transition-colors"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}

export default Header
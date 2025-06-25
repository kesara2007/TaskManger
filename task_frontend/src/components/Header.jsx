import { useAuth } from '../context/AuthContext'

const Header = ({ title, subtitle }) => {
  const { user } = useAuth()

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-navy-900">{title}</h1>
      {subtitle && <p className="text-beige-700">{subtitle}</p>}
      {user && (
        <p className="text-sm text-beige-600 mt-2">
          Welcome back, {user.name}!
        </p>
      )}
    </div>
  )
}

export default Header
import { useState } from 'react'

const UserProfile = ({ user, onUpdateProfile, onUpdatePassword, isLoading }) => {
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  })
  const [activeTab, setActiveTab] = useState('profile')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await onUpdateProfile(profileForm.name, profileForm.email)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await onUpdatePassword(passwordForm.currentPassword, passwordForm.newPassword)
      setSuccess('Password updated successfully!')
      setPasswordForm({ currentPassword: '', newPassword: '' })
    } catch (err) {
      setError(err.message || 'Failed to update password')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b border-beige-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-beige-600 hover:text-beige-800 hover:border-beige-300'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'password'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-beige-600 hover:text-beige-800 hover:border-beige-300'
            }`}
          >
            Change Password
          </button>
        </nav>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        {activeTab === 'profile' ? (
          <form onSubmit={handleProfileSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-beige-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-beige-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-beige-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-beige-700">
                  New Password (min 8 characters)
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  minLength="8"
                  className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserProfile
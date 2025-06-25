import { useUser } from '../hooks/useUser'
import Header from '../components/Header'
import UserProfile from '../components/UserProfile'
import LoadingSpinner from '../components/LoadingSpinner'

const Profile = () => {
  const { user, isLoading, updateProfile, updatePassword } = useUser()

  if (isLoading || !user) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header 
        title="Profile" 
        subtitle="Manage your account details" 
      />
      <div className="max-w-2xl mx-auto">
        <UserProfile 
          user={user} 
          onUpdateProfile={updateProfile} 
          onUpdatePassword={updatePassword} 
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Profile
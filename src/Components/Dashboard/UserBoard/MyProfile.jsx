import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Authentication/AuthProvider"
import useAxiosSecure from "../../Hooks/useAxiosSecure"



const MyProfile = () => {
  const { user } = useContext(AuthContext) 
  const [userInfo, setUserInfo] = useState(null)
const axiosSecure=useAxiosSecure()

  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`)
      .then(res => setUserInfo(res.data))
  }, [user?.email,axiosSecure])

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">

          {/* Image */}
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={user?.photoURL} alt="profile" />
            </div>
          </div>

          {/* Name */}
          <h2 className="card-title mt-2">{user?.displayName}</h2>

          {/* Role — শুধু user না হলে দেখাবে */}
          {userInfo?.role && userInfo.role !== 'user' && (
            <span className="badge badge-success">{userInfo.role}</span>
          )}

          <div className="divider"></div>

          {/* Info */}
          <div className="w-full text-left space-y-2">
            <p className="text-sm text-gray-500">Email: <span className="text-base-content">{user?.email}</span></p>
            <p className="text-sm text-gray-500">Joined: <span className="text-base-content">{userInfo?.createdAt}</span></p>
            <p className="text-sm text-gray-500">Status: <span className="text-success">Active</span></p>
          </div>

        </div>
      </div>
    </div>
  )
}
export default MyProfile;
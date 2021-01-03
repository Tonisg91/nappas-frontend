import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import tokenService from "../utils/tokenService"
import { logout } from "../reducers/users.reducer"
import { GaEvent } from "utils/analytics"

export const Profile = ({ currentUser, logout }) => {
  const history = useHistory()
  if (!currentUser) history.push("/login")

  const handleLogout = () => {
    tokenService.removeToken(logout)
    GaEvent("Logout", "User")
    history.push("/")
  }

  const { name, announcements, email, photo } = currentUser

  const displayAnnouncements = announcements.map((ad) => (
    <h1 key={ad.title}>{ad.title}</h1>
  ))

  return (
    <div>
      <h1>PROFILE</h1>
      <h3>{email}</h3>
      <h3>{name}</h3>
      {displayAnnouncements}
      <img src={photo} alt="" />
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

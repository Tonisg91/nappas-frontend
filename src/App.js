import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import * as V from './views'
import { connect } from 'react-redux'
import { getList } from './reducers/announcements.reducer'
import { getUserData } from './reducers/users.reducer'
import { Navbar } from './components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContextProvider } from './context/UserContext'
import { AnnouncementsContextProvider } from './context/AnnouncementsContext'
import handlerContext from './context/HandlerContext'


function App({ data, getList, getUserData, currentUser }) {
  const handler = useContext(handlerContext)
  console.log(handler)

  // if (handler.loading) {
  //   return (
  //     <h1>Loading data</h1>
  //   )
  // }

  // if (handler.error) {
  //   return (
  //     <h1>{handler.error}</h1>
  //   )
  // }


  return (
    <UserContextProvider >
      <Navbar />
      <Switch>
        <AnnouncementsContextProvider >
          <Route exact path="/" component={V.Home} />
          <Route exact path="/search" component={V.Listing} />
          <Route path="/search/:category" component={V.Listing} />
          <Route exact path="/item/:id" component={V.Details} />
          <Route path="/chat/:roomId" component={V.Chat} />
        </AnnouncementsContextProvider>
        <Route path="/profile" component={V.Profile} />
        <Route path="/user/:userId" component={V.Users} />
        <Route path={["/signup", "/login"]}>
          {(props) => currentUser ? <Redirect to="/profile" /> : <V.Auth {...props} />}
        </Route>
        <Route path="/new-announcement" component={V.AddForm} />
      </Switch>
      <ToastContainer />
    </UserContextProvider>
  )
}

const mapStateToProps = state => {
  return {
    data: state.announcements,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  getList: (data) => {
    dispatch(getList(data))
  },
  getUserData: (data) => {
    dispatch(getUserData(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

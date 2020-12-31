import React, { useEffect } from 'react'
<<<<<<< HEAD
import { Switch, Route } from 'react-router-dom'
=======
import { Switch, Route, Redirect } from 'react-router-dom'
>>>>>>> parent of 7fe365c... Starting conversion from redux to context
import * as V from './views'
import { connect } from 'react-redux'
import { getList } from './reducers/announcements.reducer'
import { getUserData } from './reducers/users.reducer'
import useFetchingHandler from './hooks/useFetchingHandler'
import setInitialData from './hooks/setInitialData'
<<<<<<< HEAD
=======
import { Navbar } from './components'
>>>>>>> parent of 7fe365c... Starting conversion from redux to context
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


<<<<<<< HEAD
function App({ data, getList, getUserData }) {
=======
function App({ data, getList, getUserData, currentUser }) {
>>>>>>> parent of 7fe365c... Starting conversion from redux to context
    const handler = useFetchingHandler()
    const hasData = data.length

    useEffect(() => {
      setInitialData(handler, hasData, {getList, getUserData})
    }, [getList, getUserData ,handler, hasData])

    if (handler.loading) {
      return (
        <h1>Loading data</h1>
        )
      }
      

    if (handler.hasError) {
      return (
        <h1>{handler.hasError}</h1>
        )
      }

      
    return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={V.Home} />
            <Route exact path="/search" component={V.Listing} />
            <Route path="/search/:category" component={V.Listing} />
            <Route exact path="/item/:id" component={V.Details} />
            <Route path="/profile" component={V.Profile} />
            <Route path="/chat/:roomId" component={V.Chat} />
            <Route path={[ "/signup", "/login"]}>
              { currentUser ? <Redirect to="/profile"/> : <V.Auth />}
            </Route>
            <Route path="/user/:userId" component={V.Users} />
            <Route path="/new-announcement" component={V.AddForm} />
          </Switch>
          <ToastContainer />
        </>
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

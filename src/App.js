import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as V from './views'
import { connect } from 'react-redux'
import { getList } from './reducers/announcements.reducer'
import { getUserData } from './reducers/users.reducer'
import useFetchingHandler from './hooks/useFetchingHandler'
import setInitialData from './hooks/setInitialData'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App({ data, getList, getUserData }) {
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
          <Switch>
            <Route exact path="/" component={V.Home} />
            <Route exact path="/search" component={V.Listing} />
            <Route exact path="/search/:category" component={V.Listing} />
            <Route path="/item/:id" component={V.Details} />
            <Route exact path="/profile" component={V.Profile} />
            <Route exact path="/chat/:roomId" component={V.Chat} />
            <Route exact path="/signup" component={V.Auth} />
            <Route exact path="/login" component={V.Auth} />
            <Route exact path="/user/:userId" component={V.Users} />
            <Route exact path="/new-announcement" component={V.AddForm} />
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

import React, { useEffect } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import * as V from "./views"

import { connect } from "react-redux"
import { getList } from "./reducers/announcements.reducer"
import { getUserData } from "./reducers/users.reducer"

import { Navbar } from "./components"
import { useFetchingHandler, setInitialData } from "hooks"
import { GaInit, GaPageView } from "utils/analytics"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App({ data, getList, getUserData, currentUser }) {
  const history = useHistory()
  const handler = useFetchingHandler()
  const hasData = data.length

  useEffect(() => {
    // INITIAL SETUP
    setInitialData(handler, hasData, { getList, getUserData })
  }, [getList, getUserData, handler, hasData])

  useEffect(() => {
    // GOOGLE ANALYTICS INITIALIZATION & HISTORY LISTENER
    GaInit()
    return history.listen(GaPageView)
  }, [history])

  if (handler.loading) {
    return <h1>Loading data</h1>
  }

  if (handler.hasError) {
    return <h1>{handler.hasError}</h1>
  }

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={V.Home} />
        <Route exact path="/search" component={V.Listing} />
        <Route path="/search/:category" component={V.Listing} />
        <Route exact path="/item/:id" component={V.Details} />
        <Route path="/chat/:roomId" component={V.Chat} />
        <Route path="/user/:userId" component={V.Users} />
        <Route path="/new-announcement" component={V.AddForm} />
        <Route path="/profile">
          {(props) =>
            !currentUser ? <Redirect to="/login" /> : <V.Profile {...props} />
          }
        </Route>
        <Route path={["/signup", "/login"]}>
          {(props) =>
            currentUser ? <Redirect to="/profile" /> : <V.Auth {...props} />
          }
        </Route>
      </Switch>
      <ToastContainer />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.announcements,
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getList: (data) => {
    dispatch(getList(data))
  },
  getUserData: (data) => {
    dispatch(getUserData(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

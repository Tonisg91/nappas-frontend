import React, { useCallback, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as V from './views'
import { connect } from 'react-redux'
import { getList } from './reducers/announcements.reducer'
import { getUserData } from './reducers/users.reducer'
import axios from './configs/axios'
import useFetchingHandler from './hooks/useFetchingHandler'
import tokenService from './utils/tokenService'


function App({ data, getList, getUserData }) {
  const handler = useFetchingHandler()
  const hasData = data.length

  const setInitialData = useCallback(async() => {
    try {
      if (!hasData){
        handler.setLoading(true)
        if (handler.hasError) return handler.setLoading(false)

        const announcements = await axios.get('/announcements')
        getList(announcements.data)
        
        if (!tokenService.compareTokenTime()) return
        const user = await axios.get(`/users/${tokenService.getUserId()}`)
        getUserData(user.data)

      }
    } catch (error) {
      handler.setHasError( error.response ? error.response.data : 'Server Error')
    } finally {
      handler.setLoading(false)
    }
  }, [getList, getUserData, handler, hasData])
  
  useEffect(() => {
    setInitialData()
  }, [getList, handler, setInitialData])
  
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
      </Switch>
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

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getList } from '../reducers/announcements.reducer'
import { Link } from 'react-router-dom'
import axios from '../configs/axios'
import useFetchingHandler from '../hooks/useFetchingHandler'

function Home({ data , getList}) {
    const hasData = data.length > 0
    const handler = useFetchingHandler()

    useEffect(() => {
        if (!hasData) {
            handler.setLoading(true)
            axios.get('/announcements')
                .then(({data}) => getList(data))
                .catch(({response: { data }}) => handler.setError(data))
                .finally(() => handler.setLoading(false))
            
            }
    }, [hasData, getList, handler])

    if (handler.loading) {
        return (
            <h1>Loading data</h1>
        )
    }

    if (handler.error) {
        return (
            <h1>{handler.error}</h1>
        )
    }

    return (
        <div>
            <Link to="/search" >Todos los trabajos</Link>
            <Link to="/search/construction" >Construccion</Link>
            <Link to="/search/informatica" >Informatica</Link>
            <h1>Home</h1>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.announcements,
    }
}

const mapDispatchToProps = dispatch => ({
    getList: (data) => {
        dispatch(getList(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
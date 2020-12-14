import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getList } from '../reducers/announcements.reducer'
import { Link } from 'react-router-dom'
import axios from '../configs/axios'

function Home({ data , getList}) {
    const hasData = data.length > 0

    useEffect(() => {
        if (!hasData) {
            (async function() {
                const resp = await axios.get('/announcements')

                resp.status < 400 ? getList(resp.data) : alert(resp.status)
            })()
        }
    }, [hasData, getList])

    return (
        <div>
            <Link to="/search" >Todos los trabajos</Link>
            <Link to="/construction" >Construccion</Link>
            <Link to="/informatica" >Informatica</Link>
            <h1>Home view</h1>
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
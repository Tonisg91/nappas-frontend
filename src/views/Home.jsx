import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getList } from '../reducers/announcements.reducer'
import axios from '../configs/axios'

function Home({data: { announcements }, getList}) {

    const fetchList = () => axios.get('/announcements').then(({ data }) => getList(data))

    useEffect(() => {
        fetchList()
    }, [])


    return (
        <div>
            <h1>Home view</h1>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state
    }
}

const mapDispatchToProps = dispatch => ({
    getList: (data) => {
        dispatch(getList(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
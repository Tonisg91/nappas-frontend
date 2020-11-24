import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { getList } from '../reducers/announcements.reducer'
import useFecth from '../hooks/useFetch'

function Home({data}) {
    //const { data } = useFecth('http://localhost:5000/api/announcements')
    useEffect(() => {
        getList()
    })
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
    getList: (data) => dispatch(getList(data))
})




export default connect(mapStateToProps, mapDispatchToProps)(Home)
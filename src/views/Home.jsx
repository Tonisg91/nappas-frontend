import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getList } from '../reducers/announcements.reducer'
import useFecth from '../hooks/useFetch'

function Home({data}) {

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
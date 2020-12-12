import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

function Listing() {
    const { category } = useParams()
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search)
    

    if ('geolocation' in navigator) {
        console.log('Available');

        const coordinates = navigator.geolocation.getCurrentPosition(({ coords }) => {
            console.log(coords);
        })
    } else {
        console.log('Not Available');
    }


    console.log(category);
    
    //console.log(useLocation());
    return (
        <div>
            <h1>Listing {} items</h1>
        </div>
    )
}

export default Listing

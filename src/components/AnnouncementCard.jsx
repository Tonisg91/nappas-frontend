import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'


export default function AnnouncementCard({data}) {
    const { _id, title, photoCard } = data
    const history = useHistory()

    return (
        <AdCard 
            onClick={() =>  history.push(`/item/${_id}`)}
        >
            <PhotoCard src={photoCard} alt={title}/>
            <TitleBox>
                <h3>{title}</h3>
            </TitleBox>
        </AdCard>
    )
}

AnnouncementCard.propTypes = {
    data: PropTypes.object.isRequired,
}

const AdCard = styled.div`
    border: 1px solid black;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TitleBox = styled.div`
    display: flex;
    justify-content: center;
`

const PhotoCard = styled.img`
    width: 10em;
`
import { useContext } from 'react'
import AnnouncementsContext from 'context/AnnouncementsContext'

export default function useAnnouncements() {
    const { data, setData } = useContext(AnnouncementsContext)

    return { data, setData }
}
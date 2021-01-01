import ReactGa from 'react-ga'

export const GaInit = () => ReactGa.initialize(process.env.REACT_APP_ANALYTICS_KEY, {
    debug: process.env.NODE_ENV === 'development',
})

export const GaPageView = ({pathname}) => ReactGa.pageview(pathname)

export const GaEvent = (action, category) => ReactGa.event({
    category,
    action,
})
import ReactGa from "react-ga"

export const GaInit = (debugBool) =>
  ReactGa.initialize(process.env.REACT_APP_ANALYTICS_KEY, {
    debug: debugBool,
  })

export const GaPageView = ({ pathname }) => ReactGa.pageview(pathname)

export const GaEvent = (action, category) =>
  ReactGa.event({
    category,
    action,
  })

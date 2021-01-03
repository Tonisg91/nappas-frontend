import React from "react"
import { useFetch } from "../hooks"

function Users({ match }) {
  const { data } = useFetch("/users/" + match.params.userId)

  const { photo, name } = data

  //TODO: Cards para los anuncios y sacar media de reviews
  return (
    <div>
      <img src={photo} alt={name + "photo"} />
    </div>
  )
}

export default Users

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import "./styles.css"

export default function Footer(){
    const {id} = useParams()
    const [poster, setPoster] = useState()
    const [day, setDay] =useState()
    const [hour, setHour] = useState()
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
        promise.then(response => {
            setPoster(response.data)
            setDay(response.data.day.weekday)
            setHour(response.data.name)
        })
        promise.catch(console.log("deu erro"))
    },[])
    
    return(
        poster ? 
        <div className="footer">
            <img src = {poster.posterURL} alt="posterURL" />
            <div className="filme">
                <div>
                    {poster.title}
                </div> 
                <div>
                    {day.weekday} - {hour.name}
                </div>
            </div>
        </div> : <></>
    )
}
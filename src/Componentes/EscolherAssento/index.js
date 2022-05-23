import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

import "./styles.css"

export default function EscolherAssento({nome, setNome, setMovieName, setSection, setDate}){

    return(
        <div className="escolherAssento">
            <Title />
            <Seats />
            <Description />
            <PersonalData setNome={setNome} nome={nome} />
            <Button />
            <Footer setMovieName={setMovieName} setSection={setSection} setDate={setDate} />
        </div>
    )
}

function Title(){
    return(
        <div className="title">
            Selecione o(s) assento(s)
        </div>
    )
}

function Seats(){
    const {idSessao} = useParams()
    const [name, setName] = useState()    

    useEffect(()=> {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)
        promise.then( response => {
            console.log(response.data)
            setName(response.data.seats)
        }) 
        promise.catch(console.log("deu erro"))
    },[])
    
    return(
        <div className="assentos">
            {name ? (
                name.map(assentos => <Seat id = {assentos.id} name = {assentos.name} isAvailable = {assentos.isAvailable} key = {assentos.id} />)
            ) :
                <div>Carregando Assentos</div>
            }
        </div>
    )
}

function Seat({name, isAvailable}){
    const [selecionado, setSelecionado] = useState(false)
    let css 
    if(selecionado){
        css = "selecionado"
    } else{
        css = "disponivel"
    }

    return(
        isAvailable ?     
        <div className= {css} onClick={()=> setSelecionado(! selecionado)}>
            {name}
        </div> : 
        <div className="indisponivel">
            {name}
        </div>
    )
}

function Description() {
    return(
        <div className="status">
            <div>
            <div className="selecionado"></div>
            Selecionado
            </div>
            <div>
            <div className="disponivel"></div>
            Disponível
            </div>
            <div>
            <div className="indisponivel"></div>
            Indisponível
            </div>
        </div>
    )
}

function PersonalData({nome, setNome}){
    return(
        <div className="dados" value={nome} onBlur={e => setNome(e.target.value)}>
                Nome do comprador
                <input type="text" placeholder="Digite seu nome..." />
                CPF do comprador
                <input type="text" placeholder="Digite seu CPF..." />
        </div>
    )
}

function Button(){
    return(
        <Link to = "/sucesso">
            <div className="botao">
                <button>Reservar assento(s)</button>
            </div>
        </Link>
    )
}

function Footer({setMovieName, setSection, setDate}) {
    const {id} = useParams()
    const [movie, setMovie] = useState()
    const [day, setDay] =useState()
    const [hour, setHour] = useState()

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)

        promise.then(response => {
            setMovie(response.data.movie)
            setDay(response.data.day)
            setHour(response.data.name)
            setMovieName(response.data.movie.title)
            setSection(response.data.name)
            setDate(response.data.day.date)
        })

    },[])

    return(
        movie ?     
        <div className="footer">
            <div className="imagem">
                <img src={movie.posterURL} />
            </div>
            <div className="informacoes">
                <div>{movie.title}</div>
                <div>{day.weekday} - {hour}</div> 
            </div>
        </div> : <></>
    )
}
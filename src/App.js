import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios/dist/axios.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BarraBuscar from './components/BarraBuscar';
import CardPais from './components/CardPais';

class Index extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            paises: [],
            filtro: { input: '' }
        };
    }

    componentDidMount () {
        axios.get('https://restcountries.eu/rest/v2/all').then(res => {
            this.setState({
                paises: res.data
            });
        });
    }

    handleBarraBuscar (filtro) {
        this.setState({
            filtro: {...filtro}
        });
    }

    render() {
        var paises = [...this.state.paises];
        var { input } = this.state.filtro;
        var resultadosBusqueda = paises.filter(
            pais => pais.name.toLowerCase().indexOf(input.toLowerCase()) !== -1
        );
        
        return (
            <div className="m-5">
                <div className="alert alert-info">
                    Buscar paises
                </div>
                <BarraBuscar handleChanges={(filtro) => this.handleBarraBuscar(filtro)}/>
                <hr/>
                <div className="row">
                    { resultadosBusqueda.length > 0 ? (
                        resultadosBusqueda.map(res => (
                            <div className="col-4" key={res.alpha3Code}>
                                <CardPais res={res}/>
                            </div>
                        )) 
                    ) : (
                        <div className="col-12">No se encuentra este país :(</div>
                    )}
                </div>
            </div>
        );
    }
}

async function findPais (alpha3Code) {
    var response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + alpha3Code);
    return response.data;
}

class Pais extends React.Component {
    constructor (props) {
        super(props);
        this.state = { pais: null };
    }

    render () {
        var pais = this.state.pais;
        var { alpha3Code } = this.props.match.params;
        
        if (!pais || pais.alpha3Code !== alpha3Code) findPais(alpha3Code).then(res => this.setState({ pais: res }));

        return (
            <div className="m-5">
                <Link to="/">Atras</Link>
                {pais ? (
                    <div className="row">
                        <div className="col-6">
                            <h1>{pais.name}</h1>
                            <br/>
                            <p>Capital: {pais.capital}.</p>
                            <p>Region: {pais.region}.</p>
                            <p>Subregion: {pais.subregion}.</p>
                            <p>Poblacion: {pais.population} personas.</p>
                            <p>Latitud: {pais.latlng[0]}.</p>
                            <p>Longitud: {pais.latlng[1]}.</p>
                            Lenguajes:
                            <ul>
                                {pais.languages.map(lng => <li key={lng.iso639_1}>{lng.name + ' ' + lng.nativeName}</li>)}
                            </ul>
                            Zonas horarias:
                            <ul>
                                {pais.timezones.map(timezone => <li key={timezone}>{timezone}</li>)}
                            </ul>
                            Codigos de llamada:
                            <ul>
                                {pais.callingCodes.map(code => <li key={code}>{code}</li>)}
                            </ul>
                            Bordes:
                            <ul>
                                {pais.borders.map(
                                    border => <li key={border}><Link to={'/' + border}>{border}</Link></li>
                                )}
                            </ul>
                        </div>
                        <div className="col-6">
                            <figure className="figure">
                                <img className="img-fluid" src={pais.flag} alt={pais.name}/>
                                <figcaption className="figure-caption">Bandera de {pais.name}</figcaption>
                            </figure>
                        </div>
                    </div>
                ) : (
                    <div>NOT FOUND</div>
                )}  
            </div>   
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Index}></Route>
                <Route path="/:alpha3Code" component={Pais}></Route>
            </Router>
        );
    }
}

export default App;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios/dist/axios.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

import BarraBuscar from './components/BarraBuscar';
import CardPais from './components/CardPais';

class Index extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            paises: [],
            resultadosBusqueda: []
        };
    }

    componentDidMount () {
        axios.get('https://restcountries.eu/rest/v2/all').then(res => {
            this.setState({
                paises: res.data,
                resultadosBusqueda: res.data
            });
        });
    }

    handleBarraBuscar ({ input }) {
        if (input) {
            var paises = [...this.state.paises];
            var resultadosBusqueda = paises.filter(pais => pais.name.toLowerCase().indexOf(input.toLowerCase()) != -1);

            this.setState({
                resultadosBusqueda: resultadosBusqueda
            });
        }
    }

    render() {
        var resultadosBusqueda = [...this.state.resultadosBusqueda];

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
                            <div className="col-4" key={res.alpha2Code}>
                                <CardPais res={res}/>
                            </div>
                        )) 
                    ) : (
                        <div className="col-12">Digite un pais...</div>
                    )}
                </div>
            </div>
        );
    }
}

class Pais extends React.Component {
    render () {
        return (
            'xd'
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Index}></Route>
                <Route path="/:alpha2Code" component={Pais}></Route>
            </Router>
        );
    }
}

export default App;

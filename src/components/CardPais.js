import React from 'react';
import { Link } from "react-router-dom";

class CardPais extends React.Component {
	render () {
		return (
			<div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{this.props.res.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Capital: {this.props.res.capital}</h6>
                    <p className="card-text">{this.props.res.altSpellings.join(' ')}</p>
                    <Link to={'/' + this.props.res.alpha2Code}>Mas información</Link>
                </div>
            </div>
		);
	}
}

export default CardPais;
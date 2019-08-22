import React from 'react';

class BarraBuscar extends React.Component {
	constructor (props) {
		super(props);
		this.filtro = {};
	}

	handleChange (event) {
		var target = event.target;
		this.filtro = { ...this.filtro, [target.name]: target.value };
		
		this.props.handleChanges(this.filtro);
	}

	render () {
		return (
			<form onSubmit={(event) => event.preventDefault()}>
                <div className="form-group">
                    <input
                    	type="text"
                    	name="input"
                    	className="form-control"
                    	placeholder="Digite país a buscar..."
                    	onChange={(event) => this.handleChange(event)}
                    />
                </div>
            </form>
		);
	}
}

export default BarraBuscar;
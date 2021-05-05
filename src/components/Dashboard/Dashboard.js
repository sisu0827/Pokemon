import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import  { Redirect } from 'react-router-dom'
import { gql } from '@apollo/client';
import './Dashboard.css';

class Dashboard extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {pokemons: [
		  {
		    id: 'a',
		    firstname: 'Robin',
		    lastname: 'Wieruch',
		    year: 1988,
		  },
		  {
		    id: 'b',
		    firstname: 'Dave',
		    lastname: 'Davidds',
		    year: 1990,
		  },
		],
		pre_pokemon : 0};
	}

	componentDidMount() {
		const client = new ApolloClient({
		  uri: 'https://graphql-pokemon2.vercel.app',
		  cache: new InMemoryCache()
		});

		client
		  .query({
		    query: gql`
		      query GetPokemon {
				  pokemons(first: 10) {
				    id
				    number
				    name
				    image
				    classification
				    weight {
				      minimum
				      maximum
				    }
				    height {
				      minimum
				      maximum
				    }
				  }
				}
		    `
		  })
		  .then(result => this.change_pokemon(result));
	}

	change_pokemon(res) {
	  	this.setState({pokemons: res.data.pokemons});
	  }

	poke_click(item_id) {
	  	for (var i in this.state.pokemons) {
	  		if (this.state.pokemons[i].id === item_id) {
			  	this.setState({pre_pokemon: i});
	  		}
	  	}
	}

	sign_out() {
	    sessionStorage.removeItem('token');
	    window.location.reload();
	}

	render() {
	    return (
    	<div className="dashboard_body">
    	  <button onClick={this.sign_out} className="out_btn">Sign Out</button>
	      <div className="main_div">
	      	<div className="left_div">
				    {this.state.pokemons.map(item => (
				      <div onClick={() => this.poke_click(item.id)} className="pokemon" key={item.id}>
				      	<img className="poke_img" alt="" src={item.image}/>
				      	<div className="lbl_div">
					      	<label className="poke_num"> {item.number}&nbsp;&nbsp;&nbsp; </label>
					      	<label className="poke_name"> {item.name} </label>
				      	</div>
				      </div>
				    ))}

			    <div className="left_bottom">
			    	<ul className="page_number">
				    	<li className="page_btn">1</li>
				    	<li className="page_btn">2</li>
				    	<li className="page_btn">3</li>
				    	<li className="page_btn">4</li>
			    	</ul>
			    	<ul className="page_action">
				    	<li className="page_btn prev_btn">Prev</li>
				    	<li className="page_btn next_btn">Next</li>
			    	</ul>
			    </div>
	      	</div>
	      	<div className="right_div">
	      		<div className="right_top">
		      		<label className="top_name"> {this.state.pokemons[this.state.pre_pokemon].name} </label>
		      		<label className="top_number"> #{this.state.pokemons[this.state.pre_pokemon].number} </label>
	      		</div>
	      		<div className="right_body">

	      		</div>
	      	</div>
		  </div>
	  </div>
	    );
	  }

}

export default Dashboard;
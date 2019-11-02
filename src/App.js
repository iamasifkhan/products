import React, { Component } from 'react';
import axios from 'axios';
import Products from './components/products'

class App extends Component {

	constructor (props) {
		super(props);

		this.state = {
			loading: false,
			products: [],
			currentPage: 1,
			dataLimit: 24,
			sortBySelectValue: 'Sort by',
		}
	}

	componentDidMount() {
		this.fetchProducts();
		let _this = this;

		document.addEventListener('scroll', function () {
			let doc = document.documentElement;

			// Determine if scrollY is set to bottom of the page
			let offset = doc.scrollTop + window.innerHeight;
			let height = doc.offsetHeight;

			if (offset === height) {
				_this.setState({ loading: true });

				// fetch products when scrollY touch to bottom
				_this.fetchProducts()
					.then(response => {
						_this.appendToProducts(response.data)
						_this.setState({ loading: false });
					})
			}
		})
			
	}

	toggleLoading () {
		if (this.state.loading) {
			return (
				<div>Loading...</div>
			);
		}
	}

	appendToProducts (data) {
		// Both are not working for me
		//this.setState({ products: [...this.state.products, ...data] });
		this.setState({ products: this.state.products.concat(data) });
	}

	/**
	 * Fetch products list
	 */
	fetchProducts () {
		let page = this.state.currentPage;
		let limit = this.state.dataLimit;
		let sort = this.state.sortSelectValue;

		let endpoint = 'http://localhost:3000/api/products';

		this.setState({ loading: true });

		return new Promise((resolve, reject) => {
			axios.get(endpoint, {
				params: {
					_page: page,
					_limit: limit,
					_sort: sort
				}
			})
				.then(response => {
					this.setState({ 
						products: response.data,
						currentPage: page += 1,
						loading: false
					})

					resolve(response)
				})
				.catch(error => {
					this.setState({ loading: false });
					reject(error)
				})
		})
	}

	displayProducts (items) {
		return (
			items.map(item => {
				return (					
					<Products 
						key={ item.id }
						id={ item.id } 
						face={ item.face } 
						size={ item.size } 
						price={ item.price } 
						date={ item.date }>
					</Products>
				);
			})
		);		
	}

	onSortByOptionChange (event) {
		this.setState({
			sortBySelectValue: event.target.value
		})

		this.setState({ loading: true });
		this.fetchProducts();
	}
	
	render () {
		return (
			<div className="App mt-5">
				<div className="container">
					<div className="section-header d-flex justify-content-between">
						<div className="section-title">
							<h2>Products Grid</h2>
						</div>
						<div className="sort">
							<div className="form-group">				
								<label className="mr-3">
									<select 
										className="form-control"
										value={this.state.sortBySelectValue} 
										onChange={this.onSortByOptionChange.bind(this)}>
										<option value="">Sort by</option>
										<option value="price">Price</option>
										<option value="size">Size</option>
										<option value="id">ID</option>
									</select>
								</label>
							</div>
						</div>
					</div>
					
					<div className="section-body">
						<div className="row">
							{ this.displayProducts(this.state.products) }
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-12">
								<div className="loadingContainer text-center">
									{ this.toggleLoading() }
								</div>
							</div>
						</div>				
					</div>
				</div>
			</div>
		);
	}
}

export default App;

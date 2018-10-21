import React, { Component } from 'react'
import './App.css'
import { Helmet } from 'react-helmet'
import RangerSlider from './RangeSlider'
import { version } from '../package.json'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			images: []
		}
		this.API_KEY = '5363038-37190ac03f37e4dc006203a75'
		this.image_type = 'photo'
		this.q = 'owl'
		this.safesearch = true
		this.category = 'animals nature travel feelings'
		this.min_width = 480
		this.min_height = 480
		this.per_page = 20 // Accepted values: 3 - 200 Default: 20
	}
	componentDidMount() {
		this.setState({ loading: true })
		const {
			API_KEY,
			image_type,
			q,
			safesearch,
			min_width,
			min_height,
			category,
			per_page
		} = this
		fetch(`
			https://pixabay.com/api/?
			key=${API_KEY}&
			q=${encodeURIComponent(q)}&
			image_type=${image_type}&
			safesearch=${safesearch}&
			min_width=${min_width}&
			min_height=${min_height}&
			category=${category}&
			per_page=${per_page}
		`)
			.then(response => response.json())
			.then(json => json.hits)
			.then(images => {
				this.setState({
					loading: false,
					images
				})
			})
			// eslint-disable-next-line
			.catch(error => console.error(`Error data loading: ${error}`))
	}
	render() {
		const { loading, images } = this.state
		return (
			<div className='App'>
				<div className='container App__container'>
					<Helmet>
						<title>React Range Slider</title>
					</Helmet>
					<h1>
						React Range Slider { version }
					</h1>
					{
						loading ?
							<div className="loader App__loader">
								<div className="loader__text">
									Loading
								</div>
							</div> :
							<RangerSlider>
								{
									images.map((obj, index) =>
										<img
											className='range-slider__img'
											src={obj.largeImageURL}
											alt={obj.tags || 'cap'}
											key={index}/>
									)
								}
							</RangerSlider>
					}
				</div>
			</div>
		)
	}
}

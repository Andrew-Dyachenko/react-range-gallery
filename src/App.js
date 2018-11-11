import React, { Component, Fragment } from 'react'
import './App.css'
import { Helmet } from 'react-helmet'
import preloader from './preloader.gif'
import RangerGallery, {RangeLazyImage} from './RangeGallery'
import { version } from '../package.json'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			images: [],
			loading: false,
			lazyLoad: true,
			dataList: true
		}
		this.API_KEY = '5363038-37190ac03f37e4dc006203a75'
		this.image_type = 'photo'
		this.q = 'owl'
		this.safesearch = true
		this.category = 'animals nature travel feelings'
		this.min_width = 320
		this.min_height = 320
		this.per_page = 20 // Accepted values: 3 - 200 Default: 20
		this.onCheckbox = this.onCheckbox.bind(this)
	}
	onCheckbox(e) {
		const { target } = e
		const { name, checked } = target

		this.setState({
			[`${name}`]: checked
		})
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
		const { onCheckbox } = this
		const { loading, images, lazyLoad, dataList } = this.state
		return (
			<div className='App'>
				<div className='container App__container'>
					<Helmet>
						<title>React Range Gallery</title>
					</Helmet>
					<h1>
						React Range Gallery
					</h1>
					{
						loading ?
							<div className='loader App__loader'>
								<div className='loader__text'>
									Loading
								</div>
							</div> :
							<Fragment>
								<RangerGallery
									dataList={dataList}>
									{
										images.map((obj, index) =>
											lazyLoad ?
												<RangeLazyImage
													fakeSrc={preloader}
													src={obj.webformatURL}
													alt={obj.tags || 'cap'}
													key={index}/> :

												<img
													className='range-gallery__img'
													src={obj.webformatURL}
													alt={obj.tags || 'cap'}
													key={index}/>
										)
									}
								</RangerGallery>
								<div className='options App__options'>
									<div className="form-group options__item">
										<input
											className='form-group__checkbox'
											type='checkbox'
											name='dataList'
											id='datalistSwitcher'
											onChange={onCheckbox}
											checked={dataList}/>
										<label
											htmlFor='datalistSwitcher'
											className='form-group__label'>
											Datalist
										</label>
									</div>
									<div className="form-group options__item">
										<input
											className='form-group__checkbox'
											type='checkbox'
											name='lazyLoad'
											id='lazyLoadSwitcher'
											onChange={onCheckbox}
											checked={lazyLoad}/>
										<label
											htmlFor='lazyLoadSwitcher'
											className='form-group__label'>
											Image lazy load
										</label>
									</div>
								</div>
							</Fragment>
					}
					{/* <details>
						<summary>Source</summary>
						<code>
							Source...
						</code>
					</details> */}
					<h6>
						<samp>
							{ version }
						</samp>
					</h6>
				</div>
			</div>
		)
	}
}

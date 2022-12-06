import React, { Component } from "react";
import propTypes from "prop-types";
import { compose } from "redux";
import "./RangeGallery.css";
import RangeTrack from "./RangeTrack";
import RangeController from "./RangeController";
export { version as RRGv } from "../package.json";
export { default as RangeLazyImage } from "./RangeLazyImage";

const getBreakpoints = ({ windowInnerWidth, responsive }) => {
	const breakpoints = responsive.reduce(
		(points, obj) => [...points, obj.breakpoint],
		[],
	);

	return {
		windowInnerWidth,
		breakpoints,
	};
};

const getAppropriateBreakpoint = ({ windowInnerWidth, breakpoints }) =>
	breakpoints.reduce(
		(max, next) =>
			max < windowInnerWidth && next <= windowInnerWidth ? next : max,
		0,
	);

const getAppropriateSlidesToShow = ({ breakpoint, responsive }) =>
	responsive.reduce(
		(prev, obj) => (breakpoint === obj.breakpoint ? obj.slidesToShow : prev),
		1,
	);

const getAppropriateSlidesToScroll = ({ breakpoint, responsive }) =>
	responsive.reduce(
		(prev, obj) => (breakpoint === obj.breakpoint ? obj.slidesToScroll : prev),
		1,
	);

const getAppropriateSlidesPerRow = ({ breakpoint, responsive }) =>
	responsive.reduce(
		(prev, obj) => (breakpoint === obj.breakpoint ? obj.slidesPerRow : prev),
		1,
	);

const getBreakpoint = compose(getAppropriateBreakpoint, getBreakpoints);

const getSlidesToShow = compose(getAppropriateSlidesToShow);

const getSlidesToScroll = compose(getAppropriateSlidesToScroll);

const getSlidesPerRow = compose(getAppropriateSlidesPerRow);

export default class RangeGallery extends Component {
	static propTypes = {
		children: propTypes.oneOfType([
			propTypes.arrayOf(propTypes.node),
			propTypes.node,
		]),
		className: propTypes.string.isRequired,
		conrollerClassName: propTypes.string.isRequired,
		slidesToShow: propTypes.number.isRequired,
		slidesToScroll: propTypes.number.isRequired,
		slidesPerRow: propTypes.number.isRequired,
		breakpoint: propTypes.number.isRequired,
		responsive: propTypes.arrayOf(propTypes.object),
		dataList: propTypes.bool,
	};

	static defaultProps = {
		className: "range-gallery",
		conrollerClassName: "range-conroller",
		slidesToShow: 1,
		slidesToScroll: 1,
		slidesPerRow: 1,
		breakpoint: 0,
		responsive: [
			{
				breakpoint: 0,
				slidesToShow: 1,
				slidesToScroll: 1,
				slidesPerRow: 1,
			},
			{
				breakpoint: 480,
				slidesToShow: 2,
				slidesToScroll: 2,
				slidesPerRow: 1,
			},
			{
				breakpoint: 768,
				slidesToShow: 3,
				slidesToScroll: 3,
				slidesPerRow: 1,
			},
			{
				breakpoint: 1024,
				slidesToShow: 4,
				slidesToScroll: 4,
				slidesPerRow: 1,
			},
			{
				breakpoint: 1366,
				slidesToShow: 5,
				slidesToScroll: 5,
				slidesPerRow: 1,
			},
			{
				breakpoint: 1600,
				slidesToShow: 6,
				slidesToScroll: 6,
				slidesPerRow: 2,
			},
			{
				breakpoint: 1920,
				slidesToShow: 8,
				slidesToScroll: 8,
				slidesPerRow: 2,
			},
		],
		dataList: false,
	};

	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
		this.onInput = this.onInput.bind(this);
		this.getDimensions = this.getDimensions.bind(this);
		this.onDatalist = this.onDatalist.bind(this);
		this.onPrev = this.onPrev.bind(this);
		this.onNext = this.onNext.bind(this);
		this.setDimension = this.setDimension.bind(this);
		this.updateDimension = this.updateDimension.bind(this);
		this.inputRange = React.createRef();
		this.gallery = React.createRef();

		const state = this.getDimensions();
		this.setDimension(state);
	}

	componentDidMount() {
		window.addEventListener("resize", this.onResize);
		const galleryWidth = this.getGalleryWidth();
		this.updateDimension({ galleryWidth });
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}

	onInput(e) {
		const { target } = e;
		const { value } = target;

		this.setState({ value });
	}

	onResize() {
		const state = this.getDimensions();
		const galleryWidth = this.getGalleryWidth();
		this.updateDimension({ ...state, galleryWidth });
	}

	onDatalist(e) {
		const { target } = e;
		const { children } = this.props;
		const { slidesToShow } = this.state;
		const groupsLength = Math.ceil(children.length / slidesToShow);
		const value =
			Number(target.value) === 0
				? 0
				: groupsLength / (100 / (Number(target.value) + 1));

		this.setState({ value });
	}

	onPrev() {
		const { inputRange } = this;
		const { children } = this.props;
		const { slidesToScroll, slidesPerRow, slidesToShow } = this.state;
		const currentValue = Number(inputRange.current.value);
		const groupsLength = Math.ceil(children.length / slidesToShow);
		const cols = Math.ceil(
			Math.ceil(children.length / slidesPerRow) /
				Math.ceil(slidesToScroll / slidesPerRow),
		);
		const jump = groupsLength / (cols - 1);
		const value = currentValue - jump >= 0 ? currentValue - jump : 0;

		this.setState({ value });
	}

	onNext() {
		const { inputRange } = this;
		const { children } = this.props;
		const { slidesToScroll, slidesPerRow, slidesToShow } = this.state;
		const currentValue = Number(inputRange.current.value);
		const groupsLength = Math.ceil(children.length / slidesToShow);
		const cols = Math.ceil(
			Math.ceil(children.length / slidesPerRow) /
				Math.ceil(slidesToScroll / slidesPerRow),
		);
		const jump = groupsLength / (cols - 1);
		const value =
			currentValue + jump <= groupsLength ? currentValue + jump : groupsLength;

		this.setState({ value });
	}

	getGalleryWidth() {
		const galleryWidth = this.gallery.current.offsetWidth;
		return galleryWidth;
	}

	getDimensions() {
		let { breakpoint, slidesToShow, slidesToScroll, slidesPerRow } = this.props;

		const windowInnerWidth = window.innerWidth;
		const { responsive } = this.props;

		breakpoint = getBreakpoint({ windowInnerWidth, responsive }) || breakpoint;
		slidesToShow = getSlidesToShow({ breakpoint, responsive }) || slidesToShow;
		slidesToScroll =
			getSlidesToScroll({ breakpoint, responsive }) || slidesToScroll;
		slidesPerRow = getSlidesPerRow({ breakpoint, responsive }) || slidesPerRow;

		return {
			breakpoint,
			slidesToShow,
			slidesToScroll,
			slidesPerRow,
		};
	}

	setDimension(dimensions) {
		// eslint-disable-next-line
		this.state = { ...dimensions };
	}

	updateDimension(dimensions) {
		this.setState({ ...dimensions });
	}

	render() {
		const { children, className, conrollerClassName, dataList } = this.props;
		const { breakpoint, slidesToShow, slidesToScroll, slidesPerRow, value } =
			this.state;
		const { onInput, onPrev, onNext, onDatalist, inputRange } = this;
		return (
			<div className={className} ref={this.gallery}>
				<div className={`${className}__crop`}>
					<div className={`${className}__keyhole`}>
						<RangeTrack
							className={className}
							slidesToShow={slidesToShow}
							slidesPerRow={slidesPerRow}
							slidesToScroll={slidesToScroll}
							breakpoint={breakpoint}
							value={value}
						>
							{children}
						</RangeTrack>
					</div>
				</div>
				<RangeController
					data={children}
					className={conrollerClassName}
					inputRange={inputRange}
					slidesToShow={slidesToShow}
					onInput={onInput}
					value={value}
					onPrev={onPrev}
					onNext={onNext}
					dataList={dataList}
					onDatalist={onDatalist}
				/>
			</div>
		);
	}
}

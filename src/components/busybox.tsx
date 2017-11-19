import '../assets/css/loader-style.css';

import * as React from 'react';

export const BusyBox = (props: { isVisible: true }) => {
	return (
		<div className="loader-container" style={{ display: props.isVisible ? 'none' : 'initial' }}>
			<div className="sk-cube-grid">
				<div className="sk-cube sk-cube1" />
				<div className="sk-cube sk-cube2" />
				<div className="sk-cube sk-cube3" />
				<div className="sk-cube sk-cube4" />
				<div className="sk-cube sk-cube5" />
				<div className="sk-cube sk-cube6" />
				<div className="sk-cube sk-cube7" />
				<div className="sk-cube sk-cube8" />
				<div className="sk-cube sk-cube9" />
			</div>;
		</div>
	);
};

export default BusyBox;

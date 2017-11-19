/** Stylesheet Imports */
import "./promopage.scss";
import React from "react";

const PromoPage = ({wakeupApp }) => {

	return (
		<div className="bs-promo root" onTouchStart={wakeupApp} onClick={wakeupApp}>
			<div className="logo">
				<img src="./assets/images/big-black-logo.png" alt=""/>
			</div>
			<div className="mid-text">
				<img src="./assets/images/slogan-mid.png" alt=""/>
			</div>
			<div className="bottom-text">
				<img src="./assets/images/slogan-bottom.png" alt=""/>
			</div>
			<div className="press-to-start">
				<p id="p2s">
					<span>Коснитесь экрана чтобы продолжить</span>
				</p>
			</div> 
		</div>
	);
};


export default PromoPage;

/*
				<div className="svg-container">
					<svg width="99" height="99" viewBox="0 0 99 99">
						<circle cx="49" cy="49" r="49"></circle>
					</svg>
				</div>

*/

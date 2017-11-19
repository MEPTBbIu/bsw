import * as React from 'react';
//import '../assets/css/freebird.css';
//import '../assets/css/freebird-ext.css';




export const FormViewItem = ( titleText?, helpText?, errorMessage?, children?) => (
			<div role="listitem" className="freebirdFormviewerViewItemsItemItem freebirdFormviewerViewItemsTextTextItem">
				<div className="freebirdFormviewerViewItemsItemItemHeader">
					<div className="freebirdFormviewerViewItemsItemItemTitleContainer">
						<div className="freebirdFormviewerViewItemsItemItemTitle">
							{titleText} <span className="freebirdFormviewerViewItemsItemRequiredAsterisk">*</span>
						</div>
						<div className="freebirdFormviewerViewItemsItemItemHelpText">
							{helpText}
						</div>
					</div>
				</div>
				<div className="freebirdFormviewerViewItemsTextItemWrapper">
					{children}	
				</div>
				<div className="freebirdFormviewerViewItemsItemGradingGradingBox freebirdFormviewerViewItemsItemGradingFeedbackBox">
				</div>
				<div className="freebirdFormviewerViewItemsItemErrorMessage" role="alert">
					{errorMessage}
				</div>
	</div> );


export const FormViewItemInput = ( type, value?, placeholder? ) => (
	<div className="quantumWizTextinputPaperinputEl freebirdFormviewerViewItemsTextShortText freebirdThemedInput">
		<div className="quantumWizTextinputPaperinputMainContent exportContent">
			<div className="quantumWizTextinputPaperinputContentArea exportContentArea">
				<div className="quantumWizTextinputPaperinputInputArea">
					<input type="text" className="quantumWizTextinputPaperinputInput exportInput"/>
					<div className="quantumWizTextinputPaperinputPlaceholder exportLabel">{placeholder}</div>
				</div>
				<div className="quantumWizTextinputPaperinputUnderline exportUnderline">
				</div>
				<div className="quantumWizTextinputPaperinputFocusUnderline exportFocusUnderline">
				</div>
			</div>
		</div>
		<div className="quantumWizTextinputPaperinputCounterErrorHolder">
			<div className="quantumWizTextinputPaperinputHint exportHint">
			</div>
		</div>
	</div> );

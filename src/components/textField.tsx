import * as React from 'react';

import TextField from 'material-ui/TextField';
import { TextFieldProps } from 'material-ui';

export const presets = {
	underlineShow: false,
	fullWidth: true,
	style: {
		textAlign: 'center',
		fontSize: '22px',
		lineHeight: '34px',
		height: '72px'
	},
	floatingLabelFocusStyle: { color: '#3A67D1' },
	floatingLabelStyle: { color: '#3D434343' },
	hintStyle: { width: '100%', textAlign: 'center' },
	textareaStyle: { width: '100%', textAlign: 'center' },
	inputStyle: { width: '100%', textAlign: 'center' }
};

export const STextField = (props: TextFieldProps) => {
	const mixprops = { ...presets, ...props };
	return <TextField {...mixprops} />;
};

export default STextField;

import { UPDATE_COLOR_THEME } from './types';
import {
	colorsHashtable1,
	colorsHashtable2,
	colorsHashtable3,
	colorsHashtable4,
	colorsHashtable5,
	colorsHashtable6,
	colorsHashtable7,
	colorsHashtable8,
	colorsHashtable9,
	GREY_1,
	GREY_2,
	GREY_3,
	GREY_4,
	GREY_5,
	GREY_6,
	GREY_7,
	GREY_8,
	GREY_9
} from '../containers/styles/ColorConstants';

export const generateRandomColorTheme = () => {
	return function(dispatch) {
		let isGrey_1 = Math.floor(Math.random() * 2) < 0.5;
		if (isGrey_1) {
			dispatch(_generateColorThemeBasedOnBackground(GREY_1));
		} else {
			dispatch(_generateColorThemeBasedOnBackground(GREY_9));
		}
	};
};

function _generateColorThemeBasedOnBackground(oldBackgroundColor) {
	const colorPallateIndex = Math.floor(Math.random() * 12);
	let newBackgroundColor = GREY_1;
	let newKey = colorsHashtable3[colorPallateIndex].key;
	let newKeyCompliment1 = colorsHashtable3[colorPallateIndex].keyCompliment1;
	let newKeyCompliment2 = colorsHashtable3[colorPallateIndex].keyCompliment2;
	let newThirdColor = colorsHashtable3[colorPallateIndex].thirdColor;
	let newText1Color = GREY_9;
	let newText2Color = GREY_8;
	let newText3Color = GREY_7;
	let newText4Color = GREY_6;
	let newText5Color = GREY_5;
	let newText6Color = GREY_4;
	let newText7Color = GREY_3;
	let newText8Color = GREY_2;
	let newKeyText1Color = colorsHashtable9[colorPallateIndex].key;
	let newKeyText2Color = colorsHashtable8[colorPallateIndex].key;
	let newKeyText3Color = colorsHashtable7[colorPallateIndex].key;
	let newKeyText4Color = colorsHashtable6[colorPallateIndex].key;
	let newKeyText5Color = colorsHashtable5[colorPallateIndex].key;
	let newKeyText6Color = colorsHashtable4[colorPallateIndex].key;
	let newKeyText7Color = colorsHashtable3[colorPallateIndex].key;
	let newKeyText8Color = colorsHashtable2[colorPallateIndex].key;
	if (oldBackgroundColor === GREY_1) {
		newBackgroundColor = GREY_9;
		newKeyCompliment1 = colorsHashtable7[colorPallateIndex].keyCompliment1;
		newKeyCompliment2 = colorsHashtable7[colorPallateIndex].keyCompliment2;
		newThirdColor = colorsHashtable7[colorPallateIndex].thirdColor;
		newText1Color = GREY_1;
		newText2Color = GREY_2;
		newText3Color = GREY_3;
		newText4Color = GREY_4;
		newText5Color = GREY_5;
		newText6Color = GREY_6;
		newText7Color = GREY_7;
		newText8Color = GREY_8;
		newKeyText1Color = colorsHashtable1[colorPallateIndex].key;
		newKeyText2Color = colorsHashtable2[colorPallateIndex].key;
		newKeyText3Color = colorsHashtable3[colorPallateIndex].key;
		newKeyText4Color = colorsHashtable4[colorPallateIndex].key;
		newKeyText5Color = colorsHashtable5[colorPallateIndex].key;
		newKeyText6Color = colorsHashtable6[colorPallateIndex].key;
		newKeyText7Color = colorsHashtable7[colorPallateIndex].key;
		newKeyText8Color = colorsHashtable8[colorPallateIndex].key;
	}

	return {
		type: UPDATE_COLOR_THEME,
		backgroundColor: newBackgroundColor,
		key: newKey,
		keyCompliment1: newKeyCompliment1,
		keyCompliment2: newKeyCompliment2,
		thirdColor: newThirdColor,
		text1Color: newText1Color,
		text2Color: newText2Color,
		text3Color: newText3Color,
		text4Color: newText4Color,
		text5Color: newText5Color,
		text6Color: newText6Color,
		text7Color: newText7Color,
		text8Color: newText8Color,
		keyText1Color: newKeyText1Color,
		keyText2Color: newKeyText2Color,
		keyText3Color: newKeyText3Color,
		keyText4Color: newKeyText4Color,
		keyText5Color: newKeyText5Color,
		keyText6Color: newKeyText6Color,
		keyText7Color: newKeyText7Color,
		keyText8Color: newKeyText8Color
	};
}

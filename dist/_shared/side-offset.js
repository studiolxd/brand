//#region src/stories/constants/side-offset.ts
function e(e, t = document.documentElement) {
	let n = parseFloat(e);
	return Number.isNaN(n) ? 0 : e.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : e.endsWith("em") ? n * parseFloat(getComputedStyle(t).fontSize) : n;
}
function t(t) {
	return () => {
		let n = document.documentElement;
		return e(getComputedStyle(n).getPropertyValue(t).trim(), n);
	};
}
//#endregion
export { t };

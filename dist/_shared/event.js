//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/detectBrowser.js
var e = typeof navigator < "u", t = u(), n = f(), r = d(), i = typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter:none"), a = t.platform === "MacIntel" && t.maxTouchPoints > 1 ? !0 : /iP(hone|ad|od)|iOS/.test(t.platform);
e && /firefox/i.test(r);
var o = e && /apple/i.test(navigator.vendor);
e && /Edg/i.test(r);
var s = e && /android/i.test(n) || /android/i.test(r), c = e && n.toLowerCase().startsWith("mac") && !navigator.maxTouchPoints, l = r.includes("jsdom/");
function u() {
	if (!e) return {
		platform: "",
		maxTouchPoints: -1
	};
	let t = navigator.userAgentData;
	return t?.platform ? {
		platform: t.platform,
		maxTouchPoints: navigator.maxTouchPoints
	} : {
		platform: navigator.platform ?? "",
		maxTouchPoints: navigator.maxTouchPoints ?? -1
	};
}
function d() {
	if (!e) return "";
	let t = navigator.userAgentData;
	return t && Array.isArray(t.brands) ? t.brands.map(({ brand: e, version: t }) => `${e}/${t}`).join(" ") : navigator.userAgent;
}
function f() {
	if (!e) return "";
	let t = navigator.userAgentData;
	return t?.platform ? t.platform : navigator.platform ?? "";
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js
function p(e) {
	e.preventDefault(), e.stopPropagation();
}
function m(e) {
	return "nativeEvent" in e;
}
function h(e) {
	return e.mozInputSource === 0 && e.isTrusted ? !0 : s && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function g(e) {
	return l ? !1 : !s && e.width === 0 && e.height === 0 || s && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function _(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function v(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
//#endregion
export { g as a, l as c, i as d, h as i, c as l, _ as n, p as o, m as r, a as s, v as t, o as u };

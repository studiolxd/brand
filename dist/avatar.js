import './avatar.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Avatar/Avatar.tsx
function t(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[1][0]).toUpperCase();
}
function n({ src: n, alt: r, name: i, size: a = "md", shape: o = "circle", className: s }) {
	let c = [
		"avatar",
		`avatar--${a}`,
		o === "square" ? "avatar--square" : "",
		s
	].filter(Boolean).join(" ");
	return n ? /* @__PURE__ */ e("img", {
		src: n,
		alt: r ?? i ?? "",
		className: c
	}) : /* @__PURE__ */ e("span", {
		className: `${c} avatar--initials`,
		"aria-hidden": "true",
		children: i ? t(i) : "?"
	});
}
//#endregion
export { n as Avatar };

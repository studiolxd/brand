import './avatar.css';
"use client";
import { jsx as e } from "react/jsx-runtime";
import { useState as t } from "react";
//#region src/stories/atoms/Avatar/Avatar.tsx
function n(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[1][0]).toUpperCase();
}
function r({ src: r, alt: i, name: a, size: o = "md", shape: s = "circle", className: c }) {
	let [l, u] = t(!1), d = [
		"avatar",
		`avatar--${o}`,
		s === "square" ? "avatar--square" : "",
		c
	].filter(Boolean).join(" ");
	return r && !l ? /* @__PURE__ */ e("img", {
		src: r,
		alt: i ?? a ?? "",
		className: d,
		onError: () => u(!0)
	}) : /* @__PURE__ */ e("span", {
		className: `${d} avatar--initials`,
		"aria-hidden": "true",
		children: a ? n(a) : "?"
	});
}
//#endregion
export { r as Avatar };

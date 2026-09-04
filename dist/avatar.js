'use client';
import './avatar.css';
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
	if (r && !l) return /* @__PURE__ */ e("img", {
		src: r,
		alt: i ?? a ?? "",
		className: d,
		onError: () => u(!0)
	});
	let f = i ?? a ?? "";
	return /* @__PURE__ */ e("span", {
		className: `${d} avatar--initials`,
		...f ? {
			role: "img",
			"aria-label": f
		} : { "aria-hidden": !0 },
		children: a ? n(a) : "?"
	});
}
//#endregion
export { r as Avatar };

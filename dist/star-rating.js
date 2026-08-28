'use client';
import './star-rating.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { useId as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/atoms/StarRating/StarRating.tsx
function o(e, t) {
	return Math.min(Math.max(Math.round(e * 2) / 2, 0), t);
}
function s(e, t) {
	return t >= e + 1 ? "full" : t >= e + .5 ? "half" : "empty";
}
function c({ fill: t }) {
	return /* @__PURE__ */ a("span", {
		className: "star-rating__star",
		children: [/* @__PURE__ */ i(e, {
			name: "star",
			className: "star-rating__glyph star-rating__glyph--track"
		}), t !== "empty" && /* @__PURE__ */ i(e, {
			name: "star",
			className: `star-rating__glyph star-rating__glyph--fill${t === "half" ? " star-rating__glyph--half" : ""}`
		})]
	});
}
function l({ value: e, defaultValue: l, onValueChange: u, max: d = 5, readOnly: f = !0, disabled: p = !1, size: m = "md", name: h, locale: g = "es-ES", valueLabel: _ = (e, t) => `${e.toLocaleString(g)} de ${t} estrellas`, optionLabel: v = (e, t) => `${e.toLocaleString(g)} de ${t} estrellas`, groupLabel: y = "Valoración", className: b, ...x }) {
	let S = n(), [C, w] = r(l), [T, E] = r(void 0), D = e !== void 0, O = (D ? e : C) ?? 0, k = [
		"star-rating",
		m === "md" ? "" : `star-rating--${m}`,
		f ? "" : "star-rating--input",
		b ?? ""
	].filter(Boolean).join(" "), A = Array.from({ length: d }, (e, t) => t);
	if (f) {
		let e = o(O, d);
		return /* @__PURE__ */ i("div", {
			className: k,
			role: "img",
			"aria-label": _(e, d),
			...x,
			children: A.map((t) => /* @__PURE__ */ i(c, { fill: s(t, e) }, t))
		});
	}
	function j(e) {
		D || w(e), u?.(e);
	}
	let M = T ?? Math.round(O);
	return /* @__PURE__ */ i("div", {
		className: k,
		role: "radiogroup",
		"aria-label": y,
		onPointerLeave: () => E(void 0),
		...x,
		children: A.map((e) => {
			let n = e + 1;
			return /* @__PURE__ */ a("label", {
				className: "star-rating__option",
				onPointerEnter: () => {
					p || E(n);
				},
				children: [
					/* @__PURE__ */ i("input", {
						className: "star-rating__input visually-hidden",
						type: "radio",
						name: h ?? S,
						value: n,
						checked: Math.round(O) === n,
						disabled: p,
						onChange: () => j(n),
						onFocus: () => E(n),
						onBlur: () => E(void 0)
					}),
					/* @__PURE__ */ i(c, { fill: n <= M ? "full" : "empty" }),
					/* @__PURE__ */ i(t, { children: v(n, d) })
				]
			}, n);
		})
	});
}
//#endregion
export { l as StarRating };

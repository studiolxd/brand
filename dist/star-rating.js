'use client';
import './star-rating.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useId as i, useState as a } from "react";
//#region src/stories/atoms/StarRating/StarRating.tsx
function o(e, t) {
	return Math.min(Math.max(Math.round(e * 2) / 2, 0), t);
}
function s(e, t) {
	return t >= e + 1 ? "full" : t >= e + .5 ? "half" : "empty";
}
function c({ fill: t }) {
	return /* @__PURE__ */ r("span", {
		className: "star-rating__star",
		children: [/* @__PURE__ */ n(e, {
			name: "star",
			className: "star-rating__glyph star-rating__glyph--track"
		}), t !== "empty" && /* @__PURE__ */ n(e, {
			name: "star",
			className: `star-rating__glyph star-rating__glyph--fill${t === "half" ? " star-rating__glyph--half" : ""}`
		})]
	});
}
function l({ value: e, defaultValue: l, onValueChange: u, max: d = 5, readOnly: f = !0, disabled: p = !1, size: m = "md", name: h, locale: g = "es-ES", valueLabel: _ = (e, t) => `${e.toLocaleString(g)} de ${t} estrellas`, optionLabel: v = (e, t) => `${e.toLocaleString(g)} de ${t} estrellas`, groupLabel: y = "Valoración", className: b, ...x }) {
	let S = i(), [C, w] = a(l), [T, E] = a(void 0), D = e !== void 0, O = (D ? e : C) ?? 0, k = [
		"star-rating",
		m === "md" ? "" : `star-rating--${m}`,
		f ? "" : "star-rating--input",
		b ?? ""
	].filter(Boolean).join(" "), A = Array.from({ length: d }, (e, t) => t);
	if (f) {
		let e = o(O, d);
		return /* @__PURE__ */ n("div", {
			className: k,
			role: "img",
			"aria-label": _(e, d),
			...x,
			children: A.map((t) => /* @__PURE__ */ n(c, { fill: s(t, e) }, t))
		});
	}
	function j(e) {
		D || w(e), u?.(e);
	}
	let M = T ?? Math.round(O);
	return /* @__PURE__ */ n("div", {
		className: k,
		role: "radiogroup",
		"aria-label": y,
		onPointerLeave: () => E(void 0),
		...x,
		children: A.map((e) => {
			let i = e + 1;
			return /* @__PURE__ */ r("label", {
				className: "star-rating__option",
				onPointerEnter: () => {
					p || E(i);
				},
				children: [
					/* @__PURE__ */ n("input", {
						className: "star-rating__input visually-hidden",
						type: "radio",
						name: h ?? S,
						value: i,
						checked: Math.round(O) === i,
						disabled: p,
						onChange: () => j(i),
						onFocus: () => E(i),
						onBlur: () => E(void 0)
					}),
					/* @__PURE__ */ n(c, { fill: i <= M ? "full" : "empty" }),
					/* @__PURE__ */ n(t, { children: v(i, d) })
				]
			}, i);
		})
	});
}
//#endregion
export { l as StarRating };

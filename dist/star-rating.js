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
function l(e) {
	let { value: l, defaultValue: u, onValueChange: d, max: f = 5, reviewCount: p, readOnly: m = !0, disabled: h = !1, size: g = "md", name: _, valueLabel: v, optionLabel: y, groupLabel: b, countLabel: x, emptyLabel: S, className: C, ...w } = e, T = n(), [E, D] = r(u), [O, k] = r(void 0), A = l !== void 0, j = (A ? l : E) ?? 0, M = [
		"star-rating",
		g === "md" ? "" : `star-rating--${g}`,
		m ? "" : "star-rating--input",
		C ?? ""
	].filter(Boolean).join(" "), N = Array.from({ length: f }, (e, t) => t);
	if (m) {
		if (l === null) return /* @__PURE__ */ i("div", {
			className: M,
			...w,
			children: /* @__PURE__ */ i("span", {
				className: "star-rating__empty",
				children: S ?? ""
			})
		});
		let e = o(j, f);
		return /* @__PURE__ */ a("div", {
			className: M,
			role: "img",
			"aria-label": v?.(e, f, p) ?? "",
			...w,
			children: [/* @__PURE__ */ i("span", {
				className: "star-rating__stars",
				children: N.map((t) => /* @__PURE__ */ i(c, { fill: s(t, e) }, t))
			}), p !== void 0 && /* @__PURE__ */ i("span", {
				className: "star-rating__count",
				children: x?.(p) ?? ""
			})]
		});
	}
	function P(e) {
		A || D(e), d?.(e);
	}
	let F = O ?? Math.round(j);
	return /* @__PURE__ */ i("div", {
		className: M,
		role: "radiogroup",
		"aria-label": b ?? "",
		onPointerLeave: () => k(void 0),
		...w,
		children: N.map((e) => {
			let n = e + 1;
			return /* @__PURE__ */ a("label", {
				className: "star-rating__option",
				onPointerEnter: () => {
					h || k(n);
				},
				children: [
					/* @__PURE__ */ i("input", {
						className: "star-rating__input visually-hidden",
						type: "radio",
						name: _ ?? T,
						value: n,
						checked: Math.round(j) === n,
						disabled: h,
						onChange: () => P(n),
						onFocus: () => k(n),
						onBlur: () => k(void 0)
					}),
					/* @__PURE__ */ i(c, { fill: n <= F ? "full" : "empty" }),
					/* @__PURE__ */ i(t, { children: y?.(n, f) ?? "" })
				]
			}, n);
		})
	});
}
//#endregion
export { l as StarRating };

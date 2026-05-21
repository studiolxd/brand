'use client';
import './password-field.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Input as t } from "./input.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useState as a } from "react";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
function o({ id: o, label: l, labelHidden: u = !0, name: d, placeholder: f, value: p, defaultValue: m, disabled: h, readOnly: g, size: _ = "md", error: v = !1, errorMessage: y, helperText: b, onChange: x, onBlur: S, onFocus: C }) {
	let [w, T] = a(!1), E = y ? `${o}-error` : void 0, D = b ? `${o}-helper` : void 0, O = [E, D].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ i("div", {
		className: "password-field",
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: o,
				hidden: u,
				children: l
			}),
			/* @__PURE__ */ i("div", {
				className: "password-field__wrapper",
				children: [/* @__PURE__ */ r(t, {
					id: o,
					name: d,
					type: w ? "text" : "password",
					placeholder: f ?? (u ? l : void 0),
					value: p,
					defaultValue: m,
					disabled: h,
					readOnly: g,
					size: _,
					error: v,
					describedBy: O,
					onChange: x,
					onBlur: S,
					onFocus: C
				}), /* @__PURE__ */ i("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => T((e) => !e),
					disabled: h,
					"aria-controls": o,
					"aria-pressed": w,
					children: [/* @__PURE__ */ r(e, { children: w ? "Ocultar contraseña" : "Mostrar contraseña" }), r(w ? c : s, {})]
				})]
			}),
			y && /* @__PURE__ */ r("span", {
				id: E,
				className: "password-field__error",
				role: "alert",
				children: y
			}),
			b && /* @__PURE__ */ r("span", {
				id: D,
				className: "password-field__helper",
				children: b
			})
		]
	});
}
function s() {
	return /* @__PURE__ */ i("svg", {
		className: "password-field__icon",
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ r("path", {
			d: "M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ r("circle", {
			cx: "12",
			cy: "12",
			r: "3",
			stroke: "currentColor",
			strokeWidth: "1.5"
		})]
	});
}
function c() {
	return /* @__PURE__ */ i("svg", {
		className: "password-field__icon",
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ r("path", {
				d: "M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ r("path", {
				d: "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ r("path", {
				d: "M14.12 14.12a3 3 0 1 1-4.24-4.24",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ r("line", {
				x1: "1",
				y1: "1",
				x2: "23",
				y2: "23",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	});
}
//#endregion
export { o as PasswordField };

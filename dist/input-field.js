'use client';
import './input-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Input as n } from "./input.js";
import { Label as r } from "./label.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useImperativeHandle as s, useRef as c, useState as l } from "react";
//#region src/stories/molecules/InputField/InputField.tsx
var u = o(function({ id: o, label: u, labelHidden: d = !1, name: f, type: p, kind: m = "text", clearable: h = !1, clearLabel: g = "Borrar", onClear: _, placeholder: v, value: y, defaultValue: b, disabled: x, readOnly: S, size: C, error: w = !1, errorMessage: T, helperText: E, onChange: D, onBlur: O, onFocus: k, className: A, ...j }, M) {
	let N = t(C), P = T ? `${o}-error` : void 0, F = E ? `${o}-helper` : void 0, I = [P, F].filter(Boolean).join(" ") || void 0, L = w || !!T, R = m === "search", z = c(null);
	s(M, () => z.current);
	let [B, V] = l(() => (b ?? "") !== ""), H = R && h && (y === void 0 ? B : y !== "") && !x && !S;
	function U(e) {
		y === void 0 && V(e.target.value !== ""), D?.(e);
	}
	function W() {
		let e = z.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), V(!1), e.focus(), _?.());
	}
	let G = /* @__PURE__ */ i(n, {
		ref: z,
		...R ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: p },
		...j,
		id: o,
		name: f,
		placeholder: v ?? (d ? u : void 0),
		value: y,
		defaultValue: b,
		disabled: x,
		readOnly: S,
		size: N,
		error: L,
		"aria-describedby": I,
		onChange: U,
		onBlur: O,
		onFocus: k
	});
	return /* @__PURE__ */ a("div", {
		className: ["input-field", A].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(r, {
				htmlFor: o,
				hidden: d,
				size: N,
				children: u
			}),
			R ? /* @__PURE__ */ a("div", {
				className: [
					"input-field__search",
					N === "md" ? "" : `input-field__search--${N}`,
					h ? "input-field__search--clearable" : ""
				].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ i("span", {
						className: "input-field__search-icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ i(e, {
							name: "search",
							className: "input-field__search-glyph"
						})
					}),
					G,
					H && /* @__PURE__ */ i("button", {
						type: "button",
						className: "input-field__clear",
						"aria-label": g,
						"aria-controls": o,
						onClick: W,
						children: /* @__PURE__ */ i(e, {
							name: "close",
							className: "input-field__search-glyph"
						})
					})
				]
			}) : G,
			T && /* @__PURE__ */ i("span", {
				id: P,
				className: "input-field__error",
				role: "alert",
				children: T
			}),
			E && /* @__PURE__ */ i("span", {
				id: F,
				className: "input-field__helper",
				children: E
			})
		]
	});
});
//#endregion
export { u as InputField };

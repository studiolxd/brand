'use client';
import './password-field.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Input as n } from "./input.js";
import { Label as r } from "./label.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useState as o } from "react";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
function s({ id: s, label: c, labelHidden: l = !0, name: u, placeholder: d, value: f, defaultValue: p, disabled: m, readOnly: h, size: g = "md", error: _ = !1, errorMessage: v, helperText: y, onChange: b, onBlur: x, onFocus: S }) {
	let [C, w] = o(!1), T = v ? `${s}-error` : void 0, E = y ? `${s}-helper` : void 0, D = [T, E].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ a("div", {
		className: "password-field",
		children: [
			/* @__PURE__ */ i(r, {
				htmlFor: s,
				hidden: l,
				children: c
			}),
			/* @__PURE__ */ a("div", {
				className: "password-field__wrapper",
				children: [/* @__PURE__ */ i(n, {
					id: s,
					name: u,
					type: C ? "text" : "password",
					placeholder: d ?? (l ? c : void 0),
					value: f,
					defaultValue: p,
					disabled: m,
					readOnly: h,
					size: g,
					error: _,
					describedBy: D,
					onChange: b,
					onBlur: x,
					onFocus: S
				}), /* @__PURE__ */ a("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => w((e) => !e),
					disabled: m,
					"aria-controls": s,
					"aria-pressed": C,
					children: [/* @__PURE__ */ i(t, { children: C ? "Ocultar contraseña" : "Mostrar contraseña" }), /* @__PURE__ */ i(e, {
						name: C ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			v && /* @__PURE__ */ i("span", {
				id: T,
				className: "password-field__error",
				role: "alert",
				children: v
			}),
			y && /* @__PURE__ */ i("span", {
				id: E,
				className: "password-field__helper",
				children: y
			})
		]
	});
}
//#endregion
export { s as PasswordField };

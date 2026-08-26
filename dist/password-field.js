'use client';
import './password-field.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Input as n } from "./input.js";
import { Label as r } from "./label.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s, useState as c } from "react";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var l = o(function({ label: o, labelHidden: l = !0, error: u = !1, errorMessage: d, helperText: f, size: p = "md", showPasswordLabel: m = "Mostrar contraseña", hidePasswordLabel: h = "Ocultar contraseña", className: g, id: _, disabled: v, placeholder: y, ...b }, x) {
	let S = s(), C = _ ?? S, [w, T] = c(!1), E = d ? `${C}-error` : void 0, D = f ? `${C}-helper` : void 0, O = [E, D].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ a("div", {
		className: ["password-field", g ?? ""].filter(Boolean).join(" "),
		children: [
			o && /* @__PURE__ */ i(r, {
				htmlFor: C,
				hidden: l,
				children: o
			}),
			/* @__PURE__ */ a("div", {
				className: "password-field__wrapper",
				children: [/* @__PURE__ */ i(n, {
					ref: x,
					id: C,
					size: p,
					error: u,
					placeholder: y ?? (o && l ? o : void 0),
					"aria-describedby": O,
					...b,
					type: w ? "text" : "password",
					disabled: v
				}), /* @__PURE__ */ a("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => T((e) => !e),
					disabled: v,
					"aria-controls": C,
					"aria-pressed": w,
					children: [/* @__PURE__ */ i(t, { children: w ? h : m }), /* @__PURE__ */ i(e, {
						name: w ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			d && /* @__PURE__ */ i("span", {
				id: E,
				className: "password-field__error",
				role: "alert",
				children: d
			}),
			f && /* @__PURE__ */ i("span", {
				id: D,
				className: "password-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { l as PasswordField };

'use client';
import './password-field.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Input as n } from "./input.js";
import { Label as r } from "./label.js";
import { forwardRef as i, useId as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var l = i(function({ label: i, labelHidden: l = !0, error: u = !1, errorMessage: d, helperText: f, size: p = "md", showPasswordLabel: m = "Mostrar contraseña", hidePasswordLabel: h = "Ocultar contraseña", className: g, id: _, disabled: v, placeholder: y, ...b }, x) {
	let S = a(), C = _ ?? S, [w, T] = o(!1), E = d ? `${C}-error` : void 0, D = f ? `${C}-helper` : void 0, O = [E, D].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ c("div", {
		className: ["password-field", g ?? ""].filter(Boolean).join(" "),
		children: [
			i && /* @__PURE__ */ s(r, {
				htmlFor: C,
				hidden: l,
				children: i
			}),
			/* @__PURE__ */ c("div", {
				className: "password-field__wrapper",
				children: [/* @__PURE__ */ s(n, {
					ref: x,
					id: C,
					size: p,
					error: u,
					placeholder: y ?? (i && l ? i : void 0),
					"aria-describedby": O,
					...b,
					type: w ? "text" : "password",
					disabled: v
				}), /* @__PURE__ */ c("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => T((e) => !e),
					disabled: v,
					"aria-controls": C,
					"aria-pressed": w,
					children: [/* @__PURE__ */ s(t, { children: w ? h : m }), /* @__PURE__ */ s(e, {
						name: w ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			d && /* @__PURE__ */ s("span", {
				id: E,
				className: "password-field__error",
				role: "alert",
				children: d
			}),
			f && /* @__PURE__ */ s("span", {
				id: D,
				className: "password-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { l as PasswordField };

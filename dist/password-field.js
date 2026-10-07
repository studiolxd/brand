'use client';
import './password-field.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { n as r } from "./_shared/form-size.js";
import { Input as i } from "./input.js";
import { n as a } from "./_shared/field-optional.js";
import { n as o } from "./_shared/field-labels.js";
import { a as s, n as c } from "./_shared/fieldshell.js";
import { forwardRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/messages/es/passwordField.ts
var p = {
	show: "Mostrar contraseña",
	hide: "Ocultar contraseña"
}, m = l(function({ label: l, optional: m, optionalLabel: h, labelHidden: g, error: _ = !1, errorMessage: v, helperText: y, action: b, size: x, showPasswordLabel: S, hidePasswordLabel: C, className: w, id: T, disabled: E, placeholder: D, "aria-describedby": O, ...k }, A) {
	let j = e("passwordField", p), M = r(x), N = a(m, k.required), P = o(g), F = s({
		id: T,
		error: _,
		errorMessage: v,
		helperText: y,
		describedBy: O
	}), I = F.id, [L, R] = u(!1);
	return /* @__PURE__ */ d(c, {
		field: F,
		block: "password-field",
		className: w,
		label: l,
		optional: N,
		optionalLabel: h,
		labelHidden: P,
		size: M,
		footer: b && /* @__PURE__ */ d("div", {
			className: "password-field__action",
			children: b
		}),
		children: /* @__PURE__ */ f("div", {
			className: ["password-field__wrapper", M === "md" ? "" : `password-field__wrapper--${M}`].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ d(i, {
				ref: A,
				id: I,
				size: M,
				error: F.hasError,
				placeholder: D ?? (l && P ? l : void 0),
				"aria-describedby": F.describedBy,
				...k,
				type: L ? "text" : "password",
				disabled: E
			}), /* @__PURE__ */ f("button", {
				type: "button",
				className: "password-field__toggle",
				onClick: () => R((e) => !e),
				disabled: E,
				"aria-controls": I,
				"aria-pressed": L,
				children: [/* @__PURE__ */ d(n, { children: L ? j("hide", C) : j("show", S) }), /* @__PURE__ */ d(t, {
					name: L ? "eye-off" : "eye",
					className: "password-field__icon"
				})]
			})]
		})
	});
});
//#endregion
export { m as PasswordField };

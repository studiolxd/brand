'use client';
import './password-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { n as r } from "./_shared/form-size.js";
import { Input as i } from "./input.js";
import { n as a } from "./_shared/field-labels.js";
import { n as o, t as s } from "./_shared/fieldshell.js";
import { forwardRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/messages/es/passwordField.ts
var f = {
	show: "Mostrar contraseña",
	hide: "Ocultar contraseña"
}, p = c(function({ label: c, optional: p, optionalLabel: m, labelHidden: h, error: g = !1, errorMessage: _, helperText: v, action: y, size: b, showPasswordLabel: x, hidePasswordLabel: S, className: C, id: w, disabled: T, placeholder: E, "aria-describedby": D, ...O }, k) {
	let A = e("passwordField", f), j = r(b), M = a(h), N = o({
		id: w,
		error: g,
		errorMessage: _,
		helperText: v,
		describedBy: D
	}), P = N.id, [F, I] = l(!1);
	return /* @__PURE__ */ u(s, {
		field: N,
		block: "password-field",
		className: C,
		label: c,
		optional: p,
		optionalLabel: m,
		labelHidden: M,
		size: j,
		footer: y && /* @__PURE__ */ u("div", {
			className: "password-field__action",
			children: y
		}),
		children: /* @__PURE__ */ d("div", {
			className: ["password-field__wrapper", j === "md" ? "" : `password-field__wrapper--${j}`].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ u(i, {
				ref: k,
				id: P,
				size: j,
				error: N.hasError,
				placeholder: E ?? (c && M ? c : void 0),
				"aria-describedby": N.describedBy,
				...O,
				type: F ? "text" : "password",
				disabled: T
			}), /* @__PURE__ */ d("button", {
				type: "button",
				className: "password-field__toggle",
				onClick: () => I((e) => !e),
				disabled: T,
				"aria-controls": P,
				"aria-pressed": F,
				children: [/* @__PURE__ */ u(n, { children: F ? A("hide", S) : A("show", x) }), /* @__PURE__ */ u(t, {
					name: F ? "eye-off" : "eye",
					className: "password-field__icon"
				})]
			})]
		})
	});
});
//#endregion
export { p as PasswordField };

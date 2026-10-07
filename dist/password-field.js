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
}, p = c(function({ label: c, labelHidden: p, error: m = !1, errorMessage: h, helperText: g, action: _, size: v, showPasswordLabel: y, hidePasswordLabel: b, className: x, id: S, disabled: C, placeholder: w, "aria-describedby": T, ...E }, D) {
	let O = e("passwordField", f), k = r(v), A = a(p), j = o({
		id: S,
		error: m,
		errorMessage: h,
		helperText: g,
		describedBy: T
	}), M = j.id, [N, P] = l(!1);
	return /* @__PURE__ */ u(s, {
		field: j,
		block: "password-field",
		className: x,
		label: c,
		labelHidden: A,
		size: k,
		footer: _ && /* @__PURE__ */ u("div", {
			className: "password-field__action",
			children: _
		}),
		children: /* @__PURE__ */ d("div", {
			className: ["password-field__wrapper", k === "md" ? "" : `password-field__wrapper--${k}`].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ u(i, {
				ref: D,
				id: M,
				size: k,
				error: j.hasError,
				placeholder: w ?? (c && A ? c : void 0),
				"aria-describedby": j.describedBy,
				...E,
				type: N ? "text" : "password",
				disabled: C
			}), /* @__PURE__ */ d("button", {
				type: "button",
				className: "password-field__toggle",
				onClick: () => P((e) => !e),
				disabled: C,
				"aria-controls": M,
				"aria-pressed": N,
				children: [/* @__PURE__ */ u(n, { children: N ? O("hide", b) : O("show", y) }), /* @__PURE__ */ u(t, {
					name: N ? "eye-off" : "eye",
					className: "password-field__icon"
				})]
			})]
		})
	});
});
//#endregion
export { p as PasswordField };

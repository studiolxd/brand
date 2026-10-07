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
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var f = c(function({ label: c, optional: f, optionalLabel: p, labelHidden: m, error: h = !1, errorMessage: g, helperText: _, action: v, size: y, showPasswordLabel: b, hidePasswordLabel: x, className: S, id: C, disabled: w, placeholder: T, "aria-describedby": E, ...D }, O) {
	let k = e("passwordField"), A = r(y), j = a(m), M = o({
		id: C,
		error: h,
		errorMessage: g,
		helperText: _,
		describedBy: E
	}), N = M.id, [P, F] = l(!1);
	return /* @__PURE__ */ u(s, {
		field: M,
		block: "password-field",
		className: S,
		label: c,
		optional: f,
		optionalLabel: p,
		labelHidden: j,
		size: A,
		footer: v && /* @__PURE__ */ u("div", {
			className: "password-field__action",
			children: v
		}),
		children: /* @__PURE__ */ d("div", {
			className: ["password-field__wrapper", A === "md" ? "" : `password-field__wrapper--${A}`].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ u(i, {
				ref: O,
				id: N,
				size: A,
				error: M.hasError,
				placeholder: T ?? (c && j ? c : void 0),
				"aria-describedby": M.describedBy,
				...D,
				type: P ? "text" : "password",
				disabled: w
			}), /* @__PURE__ */ d("button", {
				type: "button",
				className: "password-field__toggle",
				onClick: () => F((e) => !e),
				disabled: w,
				"aria-controls": N,
				"aria-pressed": P,
				children: [/* @__PURE__ */ u(n, { children: P ? k("hide", x) : k("show", b) }), /* @__PURE__ */ u(t, {
					name: P ? "eye-off" : "eye",
					className: "password-field__icon"
				})]
			})]
		})
	});
});
//#endregion
export { f as PasswordField };

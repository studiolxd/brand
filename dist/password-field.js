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
var f = c(function({ label: c, labelHidden: f, error: p = !1, errorMessage: m, helperText: h, action: g, size: _, showPasswordLabel: v, hidePasswordLabel: y, className: b, id: x, disabled: S, placeholder: C, "aria-describedby": w, ...T }, E) {
	let D = e("passwordField"), O = r(_), k = a(f), A = o({
		id: x,
		error: p,
		errorMessage: m,
		helperText: h,
		describedBy: w
	}), j = A.id, [M, N] = l(!1);
	return /* @__PURE__ */ u(s, {
		field: A,
		block: "password-field",
		className: b,
		label: c,
		labelHidden: k,
		size: O,
		footer: g && /* @__PURE__ */ u("div", {
			className: "password-field__action",
			children: g
		}),
		children: /* @__PURE__ */ d("div", {
			className: ["password-field__wrapper", O === "md" ? "" : `password-field__wrapper--${O}`].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ u(i, {
				ref: E,
				id: j,
				size: O,
				error: A.hasError,
				placeholder: C ?? (c && k ? c : void 0),
				"aria-describedby": A.describedBy,
				...T,
				type: M ? "text" : "password",
				disabled: S
			}), /* @__PURE__ */ d("button", {
				type: "button",
				className: "password-field__toggle",
				onClick: () => N((e) => !e),
				disabled: S,
				"aria-controls": j,
				"aria-pressed": M,
				children: [/* @__PURE__ */ u(n, { children: M ? D("hide", y) : D("show", v) }), /* @__PURE__ */ u(t, {
					name: M ? "eye-off" : "eye",
					className: "password-field__icon"
				})]
			})]
		})
	});
});
//#endregion
export { f as PasswordField };

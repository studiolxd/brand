'use client';
import './password-field.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/form-size.js";
import { ErrorText as r } from "./error-text.js";
import { Input as i } from "./input.js";
import { Label as a } from "./label.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { forwardRef as c, useId as l, useState as u } from "react";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var d = c(function({ label: c, labelHidden: d = !0, error: f = !1, errorMessage: p, helperText: m, action: h, size: g, showPasswordLabel: _ = "Mostrar contraseña", hidePasswordLabel: v = "Ocultar contraseña", className: y, id: b, disabled: x, placeholder: S, ...C }, w) {
	let T = n(g), E = l(), D = b ?? E, [O, k] = u(!1), A = p ? `${D}-error` : void 0, j = m ? `${D}-helper` : void 0, M = [A, j].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ s("div", {
		className: ["password-field", y ?? ""].filter(Boolean).join(" "),
		children: [
			c && /* @__PURE__ */ o(a, {
				htmlFor: D,
				hidden: d,
				size: T,
				children: c
			}),
			/* @__PURE__ */ s("div", {
				className: ["password-field__wrapper", T === "md" ? "" : `password-field__wrapper--${T}`].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ o(i, {
					ref: w,
					id: D,
					size: T,
					error: f || !!p,
					placeholder: S ?? (c && d ? c : void 0),
					"aria-describedby": M,
					...C,
					type: O ? "text" : "password",
					disabled: x
				}), /* @__PURE__ */ s("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => k((e) => !e),
					disabled: x,
					"aria-controls": D,
					"aria-pressed": O,
					children: [/* @__PURE__ */ o(t, { children: O ? v : _ }), /* @__PURE__ */ o(e, {
						name: O ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			p && /* @__PURE__ */ o(r, {
				id: A,
				children: p
			}),
			m && /* @__PURE__ */ o("span", {
				id: j,
				className: "password-field__helper",
				children: m
			}),
			h && /* @__PURE__ */ o("div", {
				className: "password-field__action",
				children: h
			})
		]
	});
});
//#endregion
export { d as PasswordField };

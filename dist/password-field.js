'use client';
import './password-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { n as r } from "./_shared/form-size.js";
import { ErrorText as i } from "./error-text.js";
import { Input as a } from "./input.js";
import { Label as o } from "./label.js";
import { forwardRef as s, useId as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var f = s(function({ label: s, labelHidden: f = !0, error: p = !1, errorMessage: m, helperText: h, action: g, size: _, showPasswordLabel: v, hidePasswordLabel: y, className: b, id: x, disabled: S, placeholder: C, ...w }, T) {
	let E = e("passwordField"), D = r(_), O = c(), k = x ?? O, [A, j] = l(!1), M = m ? `${k}-error` : void 0, N = h ? `${k}-helper` : void 0, P = [M, N].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ d("div", {
		className: ["password-field", b ?? ""].filter(Boolean).join(" "),
		children: [
			s && /* @__PURE__ */ u(o, {
				htmlFor: k,
				hidden: f,
				size: D,
				children: s
			}),
			/* @__PURE__ */ d("div", {
				className: ["password-field__wrapper", D === "md" ? "" : `password-field__wrapper--${D}`].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ u(a, {
					ref: T,
					id: k,
					size: D,
					error: p || !!m,
					placeholder: C ?? (s && f ? s : void 0),
					"aria-describedby": P,
					...w,
					type: A ? "text" : "password",
					disabled: S
				}), /* @__PURE__ */ d("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => j((e) => !e),
					disabled: S,
					"aria-controls": k,
					"aria-pressed": A,
					children: [/* @__PURE__ */ u(n, { children: A ? E("hide", y) : E("show", v) }), /* @__PURE__ */ u(t, {
						name: A ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			m && /* @__PURE__ */ u(i, {
				id: M,
				children: m
			}),
			h && /* @__PURE__ */ u("span", {
				id: N,
				className: "password-field__helper",
				children: h
			}),
			g && /* @__PURE__ */ u("div", {
				className: "password-field__action",
				children: g
			})
		]
	});
});
//#endregion
export { f as PasswordField };

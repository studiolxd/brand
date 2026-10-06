'use client';
import './password-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { n as r } from "./_shared/form-size.js";
import { ErrorText as i } from "./error-text.js";
import { Input as a } from "./input.js";
import { Label as o } from "./label.js";
import { n as s } from "./_shared/field-labels.js";
import { forwardRef as c, useId as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var p = c(function({ label: c, labelHidden: p, error: m = !1, errorMessage: h, helperText: g, action: _, size: v, showPasswordLabel: y, hidePasswordLabel: b, className: x, id: S, disabled: C, placeholder: w, ...T }, E) {
	let D = e("passwordField"), O = r(v), k = s(p), A = l(), j = S ?? A, [M, N] = u(!1), P = h ? `${j}-error` : void 0, F = g ? `${j}-helper` : void 0, I = [P, F].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ f("div", {
		className: ["password-field", x ?? ""].filter(Boolean).join(" "),
		children: [
			c && /* @__PURE__ */ d(o, {
				htmlFor: j,
				hidden: k,
				size: O,
				children: c
			}),
			/* @__PURE__ */ f("div", {
				className: ["password-field__wrapper", O === "md" ? "" : `password-field__wrapper--${O}`].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ d(a, {
					ref: E,
					id: j,
					size: O,
					error: m || !!h,
					placeholder: w ?? (c && k ? c : void 0),
					"aria-describedby": I,
					...T,
					type: M ? "text" : "password",
					disabled: C
				}), /* @__PURE__ */ f("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => N((e) => !e),
					disabled: C,
					"aria-controls": j,
					"aria-pressed": M,
					children: [/* @__PURE__ */ d(n, { children: M ? D("hide", b) : D("show", y) }), /* @__PURE__ */ d(t, {
						name: M ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			h && /* @__PURE__ */ d(i, {
				id: P,
				children: h
			}),
			g && /* @__PURE__ */ d("span", {
				id: F,
				className: "password-field__helper",
				children: g
			}),
			_ && /* @__PURE__ */ d("div", {
				className: "password-field__action",
				children: _
			})
		]
	});
});
//#endregion
export { p as PasswordField };

'use client';
import './alert.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useState as i } from "react";
//#region src/stories/molecules/Alert/Alert.tsx
function a({ variant: a = "default", title: o, description: s, dismissible: c = !1, onDismiss: l, className: u }) {
	let [d, f] = i(!1);
	if (d) return null;
	let p = [
		"alert",
		a === "default" ? "" : `alert--${a}`,
		a === "warning" ? "" : "surface-dark",
		c ? "alert--dismissible" : "",
		u ?? ""
	].filter(Boolean).join(" ");
	function m() {
		l ? l() : f(!0);
	}
	return /* @__PURE__ */ r("div", {
		role: "alert",
		className: p,
		children: [/* @__PURE__ */ r("div", {
			className: "alert__content",
			children: [/* @__PURE__ */ n("p", {
				className: "alert__title",
				children: o
			}), s && /* @__PURE__ */ n("div", {
				className: "alert__description",
				children: s
			})]
		}), c && /* @__PURE__ */ r("button", {
			type: "button",
			className: "alert__close",
			onClick: m,
			children: [/* @__PURE__ */ n(e, {
				name: "close",
				size: "sm"
			}), /* @__PURE__ */ n(t, { children: "Cerrar" })]
		})]
	});
}
//#endregion
export { a as Alert };

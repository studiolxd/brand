'use client';
import './stat-tile.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Tag as r } from "./tag.js";
import { forwardRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/statTile.ts
var s = {
	up: "Sube",
	down: "Baja",
	flat: "Sin cambio"
}, c = {
	up: "positive",
	down: "negative",
	flat: "neutral"
}, l = {
	positive: "success",
	negative: "danger",
	neutral: "neutral"
}, u = i(function({ label: i, value: u, delta: d, description: f, icon: p, size: m = "md", className: h, ...g }, _) {
	let v = e("statTile", s), y = [
		"stat-tile",
		m === "md" ? "" : `stat-tile--${m}`,
		h ?? ""
	].filter(Boolean).join(" "), b = d?.direction ?? "flat", x = d?.tone ?? c[b];
	return /* @__PURE__ */ o("div", {
		ref: _,
		className: y,
		...g,
		children: [
			/* @__PURE__ */ o("p", {
				className: "stat-tile__label",
				children: [p && /* @__PURE__ */ a("span", {
					className: "stat-tile__icon",
					"aria-hidden": "true",
					children: p
				}), i]
			}),
			/* @__PURE__ */ a("p", {
				className: "stat-tile__value",
				children: u
			}),
			d && /* @__PURE__ */ o(r, {
				variant: l[x],
				className: "stat-tile__delta",
				children: [
					/* @__PURE__ */ a(t, {
						name: "arrow",
						size: "sm",
						className: `stat-tile__delta-icon stat-tile__delta-icon--${b}`
					}),
					/* @__PURE__ */ a(n, { children: v(b, d.label) }),
					d.value
				]
			}),
			f && /* @__PURE__ */ a("p", {
				className: "stat-tile__description",
				children: f
			})
		]
	});
});
//#endregion
export { u as StatTile };

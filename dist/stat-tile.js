'use client';
import './stat-tile.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Tag as r } from "./tag.js";
import { forwardRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/StatTile/StatTile.tsx
var s = {
	up: "positive",
	down: "negative",
	flat: "neutral"
}, c = {
	positive: "success",
	negative: "danger",
	neutral: "neutral"
}, l = i(function({ label: i, value: l, delta: u, description: d, icon: f, size: p = "md", className: m, ...h }, g) {
	let _ = e("statTile"), v = [
		"stat-tile",
		p === "md" ? "" : `stat-tile--${p}`,
		m ?? ""
	].filter(Boolean).join(" "), y = u?.direction ?? "flat", b = u?.tone ?? s[y];
	return /* @__PURE__ */ o("div", {
		ref: g,
		className: v,
		...h,
		children: [
			/* @__PURE__ */ o("p", {
				className: "stat-tile__label",
				children: [f && /* @__PURE__ */ a("span", {
					className: "stat-tile__icon",
					"aria-hidden": "true",
					children: f
				}), i]
			}),
			/* @__PURE__ */ a("p", {
				className: "stat-tile__value",
				children: l
			}),
			u && /* @__PURE__ */ o(r, {
				variant: c[b],
				className: "stat-tile__delta",
				children: [
					/* @__PURE__ */ a(t, {
						name: "arrow",
						size: "sm",
						className: `stat-tile__delta-icon stat-tile__delta-icon--${y}`
					}),
					/* @__PURE__ */ a(n, { children: _(y, u.label) }),
					u.value
				]
			}),
			d && /* @__PURE__ */ a("p", {
				className: "stat-tile__description",
				children: d
			})
		]
	});
});
//#endregion
export { l as StatTile };

'use client';
import { t as e } from "./_shared/form-size.js";
import { Columns as t } from "./columns.js";
import { Stack as n } from "./stack.js";
import { PageIntro as r } from "./page-intro.js";
import { PublicPageShell as i } from "./public-page-shell.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s } from "react";
//#region src/stories/templates/ConnectorAuth/ConnectorAuthShell.tsx
var c = s(function({ title: s, description: c, intro: l, aside: u, children: d, header: f, footer: p, preferences: m, preferencesLabel: h, id: g, shell: _, className: v }, y) {
	let b = /* @__PURE__ */ a(r, {
		title: s,
		description: c,
		children: l
	});
	return /* @__PURE__ */ a(i, {
		ref: y,
		header: f,
		footer: p,
		preferences: m,
		preferencesLabel: h,
		id: g,
		shell: _,
		children: /* @__PURE__ */ a(e.Provider, {
			value: "lg",
			children: /* @__PURE__ */ o(t, {
				className: v,
				children: [u ? /* @__PURE__ */ o(n, {
					mobileOrder: "reverse",
					children: [b, u]
				}) : b, d]
			})
		})
	});
});
//#endregion
export { c as ConnectorAuthShell };

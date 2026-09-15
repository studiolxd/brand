'use client';
import { t as e } from "./_shared/form-size.js";
import { Columns as t } from "./columns.js";
import { Stack as n } from "./stack.js";
import { PageIntro as r } from "./page-intro.js";
import { PublicPageShell as i } from "./public-page-shell.js";
import { forwardRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorAuthShell.tsx
var c = a(function({ title: a, description: c, intro: l, aside: u, children: d, header: f, footer: p, preferences: m, preferencesLabel: h, id: g, shell: _, className: v }, y) {
	let b = /* @__PURE__ */ o(r, {
		title: a,
		description: c,
		children: l
	});
	return /* @__PURE__ */ o(i, {
		ref: y,
		header: f,
		footer: p,
		preferences: m,
		preferencesLabel: h,
		id: g,
		shell: _,
		children: /* @__PURE__ */ o(e.Provider, {
			value: "lg",
			children: /* @__PURE__ */ s(t, {
				className: v,
				children: [u ? /* @__PURE__ */ s(n, {
					mobileOrder: "reverse",
					children: [b, u]
				}) : b, d]
			})
		})
	});
});
//#endregion
export { c as ConnectorAuthShell };

'use client';
import { Columns as e } from "./columns.js";
import { Stack as t } from "./stack.js";
import { Paragraph as n } from "./paragraph.js";
import { PageIntro as r } from "./page-intro.js";
import { t as i } from "./_shared/publicpageshell.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/templates/ErrorPage/ErrorPage.tsx
function s({ title: s, description: c, homeAction: l, retryDescription: u, retryAction: d, header: f, footer: p, id: m = "main-content", shell: h = !0, className: g }) {
	return /* @__PURE__ */ a(i, {
		header: f,
		footer: p,
		id: m,
		shell: h,
		children: /* @__PURE__ */ o(e, {
			className: ["error-page__content", g].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ o(t, { children: [/* @__PURE__ */ a(r, {
				title: s,
				description: c
			}), l] }), /* @__PURE__ */ o(t, { children: [u && /* @__PURE__ */ a(n, {
				size: "lg",
				children: u
			}), d] })]
		})
	});
}
//#endregion
export { s as ErrorPage };

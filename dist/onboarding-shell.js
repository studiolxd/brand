'use client';
import './onboarding-shell.css';
import { t as e } from "./_shared/form-size.js";
import { Container as t } from "./container.js";
import { PublicPageShell as n } from "./public-page-shell.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/templates/OnboardingShell/OnboardingShell.tsx
function a({ children: a, brand: o, switchers: s, stepper: c, primaryAction: l, backAction: u, exitAction: d, actionsLabel: f = "Acciones del paso", id: p = "main-content", shell: m = !0, className: h }) {
	let g = !!(l || u || d), _ = s && /* @__PURE__ */ r("div", {
		className: "onboarding-shell__switchers",
		children: s
	}), v = o && /* @__PURE__ */ r("div", {
		className: "onboarding-shell__brand",
		children: o
	});
	return /* @__PURE__ */ r(n, {
		id: p,
		shell: m,
		header: v && /* @__PURE__ */ r(t, {
			as: "header",
			className: "onboarding-shell__top onboarding-shell__top--band",
			innerClassName: "onboarding-shell__bar",
			children: v
		}),
		footer: _ && /* @__PURE__ */ r(t, {
			as: "footer",
			className: "onboarding-shell__settings onboarding-shell__settings--band",
			children: _
		}),
		children: /* @__PURE__ */ i("div", {
			className: ["onboarding-shell", h].filter(Boolean).join(" "),
			children: [
				!m && v && /* @__PURE__ */ r("header", {
					className: "onboarding-shell__top onboarding-shell__bar",
					children: v
				}),
				/* @__PURE__ */ r(e.Provider, {
					value: "lg",
					children: /* @__PURE__ */ i("div", {
						className: "onboarding-shell__step",
						children: [
							c && /* @__PURE__ */ r("div", {
								className: "onboarding-shell__progress",
								children: c
							}),
							/* @__PURE__ */ r("div", {
								className: "onboarding-shell__body",
								children: a
							}),
							g && /* @__PURE__ */ i("div", {
								className: "onboarding-shell__actions",
								role: "group",
								"aria-label": f,
								children: [u, (d || l) && /* @__PURE__ */ i("div", {
									className: "onboarding-shell__decisions",
									children: [d && /* @__PURE__ */ r("div", {
										className: "onboarding-shell__exit",
										children: d
									}), l]
								})]
							})
						]
					})
				}),
				!m && _ && /* @__PURE__ */ r("footer", {
					className: "onboarding-shell__settings",
					children: _
				})
			]
		})
	});
}
//#endregion
export { a as OnboardingShell };

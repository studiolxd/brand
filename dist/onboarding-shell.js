'use client';
import './onboarding-shell.css';
import { t as e } from "./_shared/form-size.js";
import { Container as t } from "./container.js";
import { PublicPageShell as n } from "./public-page-shell.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/templates/OnboardingShell/OnboardingShell.tsx
function a({ children: a, brand: o, preferences: s, switchers: c, preferencesLabel: l, stepper: u, primaryAction: d, backAction: f, exitAction: p, actionsLabel: m = "Acciones del paso", id: h = "main-content", shell: g = !0, width: _ = "md", className: v }) {
	let y = !!(d || f || p), b = s ?? c, x = o && /* @__PURE__ */ r("div", {
		className: "onboarding-shell__brand",
		children: o
	});
	return /* @__PURE__ */ r(n, {
		id: h,
		shell: g,
		header: x && /* @__PURE__ */ r(t, {
			as: "header",
			className: "onboarding-shell__top onboarding-shell__top--band",
			innerClassName: "onboarding-shell__bar",
			children: x
		}),
		preferences: b,
		preferencesLabel: l,
		children: /* @__PURE__ */ i("div", {
			className: ["onboarding-shell", v].filter(Boolean).join(" "),
			children: [
				!g && x && /* @__PURE__ */ r("header", {
					className: "onboarding-shell__top onboarding-shell__bar",
					children: x
				}),
				/* @__PURE__ */ r(e.Provider, {
					value: "lg",
					children: /* @__PURE__ */ i("div", {
						className: ["onboarding-shell__step", _ === "wide" ? "onboarding-shell__step--wide" : ""].filter(Boolean).join(" "),
						children: [
							u && /* @__PURE__ */ r("div", {
								className: "onboarding-shell__progress",
								children: u
							}),
							/* @__PURE__ */ r("div", {
								className: "onboarding-shell__body",
								children: a
							}),
							y && /* @__PURE__ */ i("div", {
								className: "onboarding-shell__actions",
								role: "group",
								"aria-label": m,
								children: [f, (p || d) && /* @__PURE__ */ i("div", {
									className: "onboarding-shell__decisions",
									children: [p && /* @__PURE__ */ r("div", {
										className: "onboarding-shell__exit",
										children: p
									}), d]
								})]
							})
						]
					})
				}),
				!g && b && /* @__PURE__ */ r("section", {
					className: "onboarding-shell__settings",
					"aria-label": l ?? "Preferencias",
					children: b
				})
			]
		})
	});
}
//#endregion
export { a as OnboardingShell };

'use client';
import './onboarding-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/form-size.js";
import { Container as n } from "./container.js";
import { PublicPageShell as r } from "./public-page-shell.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/templates/OnboardingShell/OnboardingShell.tsx
function o({ children: o, brand: s, preferences: c, switchers: l, preferencesLabel: u, stepper: d, primaryAction: f, backAction: p, exitAction: m, actionsLabel: h, id: g = "main-content", shell: _ = !0, width: v = "md", className: y }) {
	let b = e("onboardingShell"), x = e("publicPageShell"), S = !!(f || p || m), C = c ?? l, w = s && /* @__PURE__ */ i("div", {
		className: "onboarding-shell__brand",
		children: s
	});
	return /* @__PURE__ */ i(r, {
		id: g,
		shell: _,
		header: w && /* @__PURE__ */ i(n, {
			as: "header",
			className: "onboarding-shell__top onboarding-shell__top--band",
			innerClassName: "onboarding-shell__bar",
			children: w
		}),
		preferences: C,
		preferencesLabel: u,
		children: /* @__PURE__ */ a("div", {
			className: ["onboarding-shell", y].filter(Boolean).join(" "),
			children: [
				!_ && w && /* @__PURE__ */ i("header", {
					className: "onboarding-shell__top onboarding-shell__bar",
					children: w
				}),
				/* @__PURE__ */ i(t.Provider, {
					value: "lg",
					children: /* @__PURE__ */ a("div", {
						className: ["onboarding-shell__step", v === "wide" ? "onboarding-shell__step--wide" : ""].filter(Boolean).join(" "),
						children: [
							d && /* @__PURE__ */ i("div", {
								className: "onboarding-shell__progress",
								children: d
							}),
							/* @__PURE__ */ i("div", {
								className: "onboarding-shell__body",
								children: o
							}),
							S && /* @__PURE__ */ a("div", {
								className: "onboarding-shell__actions",
								role: "group",
								"aria-label": b("actions", h),
								children: [p, (m || f) && /* @__PURE__ */ a("div", {
									className: "onboarding-shell__decisions",
									children: [m && /* @__PURE__ */ i("div", {
										className: "onboarding-shell__exit",
										children: m
									}), f]
								})]
							})
						]
					})
				}),
				!_ && C && /* @__PURE__ */ i("section", {
					className: "onboarding-shell__settings",
					"aria-label": x("preferences", u),
					children: C
				})
			]
		})
	});
}
//#endregion
export { o as OnboardingShell };

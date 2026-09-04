'use client';
import './onboarding-shell.css';
import { PublicPageShell as e } from "./public-page-shell.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/templates/OnboardingShell/OnboardingShell.tsx
function r({ children: r, brand: i, switchers: a, stepper: o, primaryAction: s, backAction: c, exitAction: l, actionsLabel: u = "Acciones del paso", id: d = "main-content", shell: f = !0, className: p }) {
	let m = !!(s || c || l);
	return /* @__PURE__ */ t(e, {
		id: d,
		shell: f,
		children: /* @__PURE__ */ n("div", {
			className: ["onboarding-shell", p].filter(Boolean).join(" "),
			children: [
				i && /* @__PURE__ */ t("header", {
					className: "onboarding-shell__top",
					children: /* @__PURE__ */ t("div", {
						className: "onboarding-shell__brand",
						children: i
					})
				}),
				/* @__PURE__ */ n("div", {
					className: "onboarding-shell__step",
					children: [
						o && /* @__PURE__ */ t("div", {
							className: "onboarding-shell__progress",
							children: o
						}),
						/* @__PURE__ */ t("div", {
							className: "onboarding-shell__body",
							children: r
						}),
						m && /* @__PURE__ */ n("div", {
							className: "onboarding-shell__actions",
							role: "group",
							"aria-label": u,
							children: [/* @__PURE__ */ n("div", {
								className: "onboarding-shell__decisions",
								children: [c, s]
							}), l && /* @__PURE__ */ t("div", {
								className: "onboarding-shell__exit",
								children: l
							})]
						})
					]
				}),
				a && /* @__PURE__ */ t("footer", {
					className: "onboarding-shell__settings",
					children: /* @__PURE__ */ t("div", {
						className: "onboarding-shell__switchers",
						children: a
					})
				})
			]
		})
	});
}
//#endregion
export { r as OnboardingShell };

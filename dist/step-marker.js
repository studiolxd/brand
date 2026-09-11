import './step-marker.css';
import { Icon as e } from "./icon.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/StepMarker/StepMarker.tsx
function n({ state: n = "neutral", tone: r = "primary", size: i = "md", count: a, icon: o, className: s }) {
	let c = n === "done", l = n === "pending", u = [
		"step-marker",
		`step-marker--${i}`,
		`step-marker--state-${n}`,
		!l && `step-marker--tone-${r}`,
		s
	].filter(Boolean).join(" "), d = a;
	return c ? d = /* @__PURE__ */ t(e, {
		name: "check",
		className: "step-marker__icon"
	}) : o && (d = /* @__PURE__ */ t(e, {
		name: o,
		className: "step-marker__icon"
	})), /* @__PURE__ */ t("span", {
		className: u,
		"aria-hidden": "true",
		children: d
	});
}
//#endregion
export { n as StepMarker };

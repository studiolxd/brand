import './step-marker.css';
import { n as e } from "./_shared/env.js";
import { Icon as t } from "./icon.js";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/StepMarker/StepMarker.tsx
function r({ state: r = "neutral", tone: i = "primary", size: a = "md", count: o, icon: s, className: c }) {
	let l = i;
	l === "danger" && (e("StepMarker", "tone=\"danger\"", "`tone=\"error\"`"), l = "error");
	let u = r === "done", d = r === "pending", f = [
		"step-marker",
		`step-marker--${a}`,
		`step-marker--state-${r}`,
		!d && `step-marker--tone-${l}`,
		c
	].filter(Boolean).join(" "), p = o;
	return u ? p = /* @__PURE__ */ n(t, {
		name: "check",
		className: "step-marker__icon"
	}) : s && (p = /* @__PURE__ */ n(t, {
		name: s,
		className: "step-marker__icon"
	})), /* @__PURE__ */ n("span", {
		className: f,
		"aria-hidden": "true",
		children: p
	});
}
//#endregion
export { r as StepMarker };

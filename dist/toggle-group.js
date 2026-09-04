'use client';
import './toggle-group.css';
import { t as e } from "./_shared/ToggleGroupContext.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n, useMemo as r } from "react";
import { ToggleGroup as i } from "@base-ui/react/toggle-group";
//#region src/stories/atoms/ToggleGroup/ToggleGroup.tsx
var a = n(function({ value: n, defaultValue: a, onValueChange: o, multiple: s = !1, size: c, orientation: l = "horizontal", children: u, className: d, ...f }, p) {
	let m = [
		"toggle-group",
		l === "vertical" ? "toggle-group--vertical" : "",
		d ?? ""
	].filter(Boolean).join(" "), h = r(() => ({ size: c }), [c]);
	return /* @__PURE__ */ t(e.Provider, {
		value: h,
		children: /* @__PURE__ */ t(i, {
			ref: p,
			className: m,
			value: n,
			defaultValue: a,
			multiple: s,
			orientation: l,
			onValueChange: o ? (e) => o(e) : void 0,
			...f,
			children: u
		})
	});
});
//#endregion
export { a as ToggleGroup };

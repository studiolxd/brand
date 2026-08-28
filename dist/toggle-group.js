'use client';
import './toggle-group.css';
import { t as e } from "./_shared/ToggleGroupContext.js";
import { forwardRef as t, useMemo as n } from "react";
import { jsx as r } from "react/jsx-runtime";
import { ToggleGroup as i } from "@base-ui-components/react/toggle-group";
//#region src/stories/atoms/ToggleGroup/ToggleGroup.tsx
var a = t(function({ value: t, defaultValue: a, onValueChange: o, multiple: s = !1, size: c, orientation: l = "horizontal", children: u, className: d, ...f }, p) {
	let m = [
		"toggle-group",
		l === "vertical" ? "toggle-group--vertical" : "",
		d ?? ""
	].filter(Boolean).join(" "), h = n(() => ({ size: c }), [c]);
	return /* @__PURE__ */ r(e.Provider, {
		value: h,
		children: /* @__PURE__ */ r(i, {
			ref: p,
			className: m,
			value: t,
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

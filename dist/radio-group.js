'use client';
import './radio-group.css';
import { t as e } from "./_shared/RadioGroupContext.js";
import { useCallback as t, useId as n, useState as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/atoms/RadioGroup/RadioGroup.tsx
function a({ value: a, defaultValue: o, onValueChange: s, name: c, disabled: l, size: u, error: d, orientation: f = "vertical", children: p, className: m, ...h }) {
	let g = n(), [_, v] = r(o), y = a !== void 0, b = y ? a : _, x = t((e) => {
		y || v(e), s?.(e);
	}, [y, s]), S = [
		"radio-group",
		f === "horizontal" ? "radio-group--horizontal" : "",
		m ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i(e.Provider, {
		value: {
			name: c ?? g,
			value: b,
			select: x,
			disabled: l,
			size: u,
			error: d
		},
		children: /* @__PURE__ */ i("div", {
			role: "radiogroup",
			className: S,
			...h,
			children: p
		})
	});
}
//#endregion
export { a as RadioGroup };

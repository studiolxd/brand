'use client';
import './radio-group.css';
import { t as e } from "./_shared/RadioGroupContext.js";
import { jsx as t } from "react/jsx-runtime";
import { useCallback as n, useId as r, useState as i } from "react";
//#region src/stories/atoms/RadioGroup/RadioGroup.tsx
function a({ value: a, defaultValue: o, onValueChange: s, name: c, disabled: l, size: u, error: d, orientation: f = "vertical", children: p, className: m, ...h }) {
	let g = r(), [_, v] = i(o), y = a !== void 0, b = y ? a : _, x = n((e) => {
		y || v(e), s?.(e);
	}, [y, s]), S = [
		"radio-group",
		f === "horizontal" ? "radio-group--horizontal" : "",
		m ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(e.Provider, {
		value: {
			name: c ?? g,
			value: b,
			select: x,
			disabled: l,
			size: u,
			error: d
		},
		children: /* @__PURE__ */ t("div", {
			role: "radiogroup",
			className: S,
			...h,
			children: p
		})
	});
}
//#endregion
export { a as RadioGroup };

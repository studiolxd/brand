'use client';
import './button.css';
import { jsx as e } from "react/jsx-runtime";
import { Slot as t } from "@radix-ui/react-slot";
//#region src/stories/atoms/Button/Button.tsx
function n({ variant: n = "primary", size: r = "md", block: i = !1, children: a, type: o = "button", disabled: s, onClick: c, href: l, external: u = !1, asChild: d = !1 }) {
	let f = [
		"button",
		`button--${n}`,
		r === "md" ? "" : `button--${r}`,
		i ? "button--block" : ""
	].filter(Boolean).join(" ");
	return d ? /* @__PURE__ */ e(t, {
		className: f,
		onClick: c,
		children: a
	}) : l === void 0 ? /* @__PURE__ */ e("button", {
		className: f,
		type: o,
		disabled: s,
		onClick: c,
		children: a
	}) : /* @__PURE__ */ e("a", {
		className: f,
		href: s ? void 0 : l,
		"aria-disabled": s ? !0 : void 0,
		onClick: c,
		...u ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: a
	});
}
//#endregion
export { n as Button };

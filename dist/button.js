'use client';
import './button.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Button/Button.tsx
function t({ variant: t = "primary", size: n = "md", block: r = !1, children: i, type: a = "button", disabled: o, onClick: s, href: c, external: l = !1 }) {
	let u = [
		"button",
		`button--${t}`,
		n === "md" ? "" : `button--${n}`,
		r ? "button--block" : ""
	].filter(Boolean).join(" ");
	return c === void 0 ? /* @__PURE__ */ e("button", {
		className: u,
		type: a,
		disabled: o,
		onClick: s,
		children: i
	}) : /* @__PURE__ */ e("a", {
		className: u,
		href: o ? void 0 : c,
		"aria-disabled": o ? !0 : void 0,
		onClick: s,
		...l ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: i
	});
}
//#endregion
export { t as Button };

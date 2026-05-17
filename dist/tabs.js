'use client';
import './tabs.css';
import { jsx as e } from "react/jsx-runtime";
import * as t from "@radix-ui/react-tabs";
//#region src/stories/atoms/Tabs/Tabs.tsx
function n({ orientation: n = "horizontal", className: r, children: i, ...a }) {
	return /* @__PURE__ */ e(t.Root, {
		className: ["tabs", r].filter(Boolean).join(" "),
		orientation: n,
		...a,
		children: i
	});
}
function r({ variant: n = "underline", className: r, children: i }) {
	return /* @__PURE__ */ e(t.List, {
		className: [
			"tabs__list",
			n === "pill" && "tabs__list--pill",
			r
		].filter(Boolean).join(" "),
		children: i
	});
}
function i({ value: n, disabled: r, className: i, children: a }) {
	return /* @__PURE__ */ e(t.Trigger, {
		value: n,
		disabled: r,
		className: ["tabs__trigger", i].filter(Boolean).join(" "),
		children: a
	});
}
function a({ value: n, className: r, children: i }) {
	return /* @__PURE__ */ e(t.Content, {
		value: n,
		className: ["tabs__content", r].filter(Boolean).join(" "),
		children: i
	});
}
//#endregion
export { n as Tabs, a as TabsContent, r as TabsList, i as TabsTrigger };

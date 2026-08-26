'use client';
import './switcher.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t, useCallback as n } from "react";
import { Switch as r } from "@base-ui-components/react/switch";
//#region src/stories/atoms/Switcher/Switcher.tsx
var i = t(function({ size: t = "md", className: i, value: a, onCheckedChange: o, id: s, ...c }, l) {
	let u = [
		"switcher",
		t === "md" ? "" : `switcher--${t}`,
		i ?? ""
	].filter(Boolean).join(" "), d = n((e) => {
		e && a !== void 0 && (e.value = a);
	}, [a]);
	return /* @__PURE__ */ e(r.Root, {
		ref: l,
		className: u,
		inputRef: d,
		render: /* @__PURE__ */ e("button", {
			type: "button",
			id: s
		}),
		nativeButton: !0,
		onCheckedChange: o ? (e) => o(e) : void 0,
		...c,
		children: /* @__PURE__ */ e(r.Thumb, { className: "switcher__thumb" })
	});
});
//#endregion
export { i as Switcher };

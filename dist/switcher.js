'use client';
import './switcher.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t, useCallback as n } from "react";
import { Switch as r } from "@base-ui/react/switch";
//#region src/stories/atoms/Switcher/Switcher.tsx
var i = t(function({ size: t = "md", error: i = !1, className: a, value: o, onCheckedChange: s, id: c, ...l }, u) {
	let d = [
		"switcher",
		t === "md" ? "" : `switcher--${t}`,
		i ? "switcher--error" : "",
		a ?? ""
	].filter(Boolean).join(" "), f = n((e) => {
		e && o !== void 0 && (e.value = o);
	}, [o]);
	return /* @__PURE__ */ e(r.Root, {
		ref: u,
		className: d,
		inputRef: f,
		render: /* @__PURE__ */ e("button", {
			type: "button",
			id: c
		}),
		nativeButton: !0,
		"aria-invalid": i || void 0,
		onCheckedChange: s ? (e) => s(e) : void 0,
		...l,
		children: /* @__PURE__ */ e(r.Thumb, { className: "switcher__thumb" })
	});
});
//#endregion
export { i as Switcher };

'use client';
import './switcher.css';
import { forwardRef as e, useCallback as t } from "react";
import { jsx as n } from "react/jsx-runtime";
import { Switch as r } from "@base-ui-components/react/switch";
//#region src/stories/atoms/Switcher/Switcher.tsx
var i = e(function({ size: e = "md", error: i = !1, className: a, value: o, onCheckedChange: s, id: c, ...l }, u) {
	let d = [
		"switcher",
		e === "md" ? "" : `switcher--${e}`,
		i ? "switcher--error" : "",
		a ?? ""
	].filter(Boolean).join(" "), f = t((e) => {
		e && o !== void 0 && (e.value = o);
	}, [o]);
	return /* @__PURE__ */ n(r.Root, {
		ref: u,
		className: d,
		inputRef: f,
		render: /* @__PURE__ */ n("button", {
			type: "button",
			id: c
		}),
		nativeButton: !0,
		"aria-invalid": i || void 0,
		onCheckedChange: s ? (e) => s(e) : void 0,
		...l,
		children: /* @__PURE__ */ n(r.Thumb, { className: "switcher__thumb" })
	});
});
//#endregion
export { i as Switcher };

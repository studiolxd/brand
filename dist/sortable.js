'use client';
import './sortable.css';
import { t as e } from "./_shared/css-properties.js";
import { forwardRef as t, useCallback as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/atoms/Sortable/Sortable.tsx
var i = t(function({ as: t = "div", transform: i, transition: a, dragging: o = !1, className: s, children: c, ...l }, u) {
	let d = e({
		"--sortable-x": i ? `${i.x}px` : void 0,
		"--sortable-y": i ? `${i.y}px` : void 0,
		"--sortable-scale-x": i?.scaleX === void 0 ? void 0 : String(i.scaleX),
		"--sortable-scale-y": i?.scaleY === void 0 ? void 0 : String(i.scaleY),
		"--sortable-transition": a ?? void 0
	});
	return /* @__PURE__ */ r(t, {
		ref: n((e) => {
			d(e), typeof u == "function" ? u(e) : u && (u.current = e);
		}, [d, u]),
		className: ["sortable", s].filter(Boolean).join(" "),
		"data-dragging": o ? "" : void 0,
		...l,
		children: c
	});
});
//#endregion
export { i as Sortable };

'use client';
import './sortable.css';
import { t as e } from "./_shared/assign-ref.js";
import { t } from "./_shared/css-properties.js";
import { forwardRef as n, useCallback as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/atoms/Sortable/Sortable.tsx
var a = n(function({ as: n = "div", transform: a, transition: o, dragging: s = !1, className: c, children: l, ...u }, d) {
	let f = t({
		"--sortable-x": a ? `${a.x}px` : void 0,
		"--sortable-y": a ? `${a.y}px` : void 0,
		"--sortable-scale-x": a?.scaleX === void 0 ? void 0 : String(a.scaleX),
		"--sortable-scale-y": a?.scaleY === void 0 ? void 0 : String(a.scaleY),
		"--sortable-transition": o ?? void 0
	});
	return /* @__PURE__ */ i(n, {
		ref: r((t) => {
			f(t), e(d, t);
		}, [f, d]),
		className: ["sortable", c].filter(Boolean).join(" "),
		"data-dragging": s ? "" : void 0,
		...u,
		children: l
	});
});
//#endregion
export { a as Sortable };

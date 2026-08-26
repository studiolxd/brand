'use client';
import './sheet.css';
import { a as e, i as t } from "./_shared/popupStateMapping.js";
import { m as n, n as r, t as i } from "./_shared/useRenderElement.js";
import { t as a } from "./_shared/useBaseUiId.js";
import { t as o } from "./_shared/useButton.js";
import { Icon as s } from "./icon.js";
import { t as c } from "./_shared/useClick.js";
import { o as l } from "./_shared/useSyncedFloatingRootContext.js";
import { VisuallyHidden as u } from "./visually-hidden.js";
import { a as d, c as f, i as p, n as m, o as h, r as g, s as _, t as v } from "./_shared/DialogTitle.js";
import * as y from "react";
import { jsx as b, jsxs as x } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/trigger/DialogTrigger.js
var S = /* @__PURE__ */ y.forwardRef(function(s, u) {
	let { render: d, className: p, disabled: m = !1, nativeButton: h = !0, id: g, payload: _, handle: v, ...b } = s, x = f(!0), S = v?.store ?? x?.store;
	if (!S) throw Error(process.env.NODE_ENV === "production" ? n(79) : "Base UI: <Dialog.Trigger> must be used within <Dialog.Root> or provided with a handle.");
	let C = a(g), w = S.useState("floatingRootContext"), T = S.useState("isOpenedByTrigger", C), E = y.useRef(null), { registerTrigger: D, isMountedByThisTrigger: O } = l(C, E, S, { payload: _ }), { getButtonProps: k, buttonRef: A } = o({
		disabled: m,
		native: h
	}), j = e([c(w, { enabled: w != null })]), M = y.useMemo(() => ({
		disabled: m,
		open: T
	}), [m, T]), N = S.useState("triggerProps", O);
	return i("button", s, {
		state: M,
		ref: [
			A,
			u,
			D,
			E
		],
		props: [
			j.getReferenceProps(),
			N,
			{
				[r]: "",
				id: C
			},
			b,
			k
		],
		stateAttributesMapping: t
	});
});
process.env.NODE_ENV !== "production" && (S.displayName = "DialogTrigger");
//#endregion
//#region src/stories/molecules/Sheet/Sheet.tsx
function C({ className: e, ...t }) {
	return /* @__PURE__ */ b("div", {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function w({ open: e, onOpenChange: t, side: n = "right", title: r, titleHidden: i = !1, description: a, footer: o, children: c, closeLabel: l = "Cerrar", trigger: f, onAnimationEndCapture: y, className: w }) {
	return /* @__PURE__ */ x(m, {
		open: e,
		onOpenChange: (e) => t(e),
		children: [f && /* @__PURE__ */ b(S, { render: f }), /* @__PURE__ */ x(g, { children: [/* @__PURE__ */ b(_, { className: "sheet__overlay" }), /* @__PURE__ */ x(p, {
			className: ["sheet", w].filter(Boolean).join(" "),
			"data-side": n,
			onAnimationEndCapture: y,
			children: [
				/* @__PURE__ */ x("header", {
					className: "sheet__header",
					children: [i ? /* @__PURE__ */ b(v, { render: /* @__PURE__ */ b(u, { children: r }) }) : /* @__PURE__ */ b(v, {
						className: "sheet__title",
						children: r
					}), a != null && /* @__PURE__ */ b(d, {
						className: "sheet__description",
						children: a
					})]
				}),
				/* @__PURE__ */ b(h, {
					className: "sheet__close",
					"aria-label": l,
					children: /* @__PURE__ */ b(s, {
						name: "close",
						size: "sm"
					})
				}),
				/* @__PURE__ */ b("div", {
					className: "sheet__body",
					children: c
				}),
				o && /* @__PURE__ */ b(C, { children: o })
			]
		})] })]
	});
}
//#endregion
export { w as Sheet, C as SheetFooter };

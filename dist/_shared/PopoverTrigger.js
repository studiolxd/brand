import { I as e, L as t, P as n, a as r, i, r as a, w as o, z as s } from "./popupStateMapping.js";
import { m as c, n as ee, t as l } from "./useRenderElement.js";
import { E as u, R as d, x as f } from "./floating-ui.utils.dom.js";
import { t as p } from "./useBaseUiId.js";
import { t as m } from "./useButton.js";
import { C as te } from "./owner.js";
import { n as h, t as g } from "./safePolygon.js";
import { t as _ } from "./useClick.js";
import { o as v } from "./useSyncedFloatingRootContext.js";
import { a as y } from "./PopoverPopup.js";
import * as b from "react";
import { jsx as x, jsxs as ne } from "react/jsx-runtime";
import * as S from "react-dom";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/trigger/PopoverTrigger.js
var C = /* @__PURE__ */ b.forwardRef(function(C, w) {
	let { render: re, className: ie, disabled: T = !1, nativeButton: E = !0, handle: D, payload: O, openOnHover: k = !1, delay: A = 300, closeDelay: j = 0, id: M, ...N } = C, P = y(!0), F = D?.store ?? P?.store;
	if (!F) throw Error(process.env.NODE_ENV === "production" ? c(74) : "Base UI: <Popover.Trigger> must be either used within a <Popover.Root> component or provided with a handle.");
	let I = p(M), L = F.useState("isTriggerActive", I), R = F.useState("floatingRootContext"), z = F.useState("isOpenedByTrigger", I), B = b.useRef(null), { registerTrigger: V, isMountedByThisTrigger: H } = v(I, B, F, {
		payload: O,
		disabled: T,
		openOnHover: k,
		closeDelay: j
	}), U = F.useState("openChangeReason"), W = F.useState("stickIfOpen"), G = F.useState("openMethod"), K = h(R, {
		enabled: R != null && k && (G !== "touch" || U !== "trigger-press"),
		mouseOnly: !0,
		move: !1,
		handleClose: g(),
		restMs: A,
		delay: { close: j },
		triggerElementRef: B,
		isActiveTrigger: L
	}), q = r([_(R, {
		enabled: R != null,
		stickIfOpen: W
	})]), J = F.useState("triggerProps", H), Y = b.useMemo(() => ({
		disabled: T,
		open: z
	}), [T, z]), { getButtonProps: X, buttonRef: Z } = m({
		disabled: T,
		native: E
	}), ae = b.useMemo(() => ({ open(e) {
		return e && U === "trigger-press" ? a.open(e) : i.open(e);
	} }), [U]), Q = l("button", C, {
		state: Y,
		ref: [
			Z,
			w,
			V,
			B
		],
		props: [
			q.getReferenceProps(),
			K,
			J,
			{
				[ee]: "",
				id: I
			},
			N,
			X
		],
		stateAttributesMapping: ae
	}), $ = b.useRef(null), oe = d((e) => {
		S.flushSync(() => {
			F.setOpen(!1, f(u, e.nativeEvent, e.currentTarget));
		}), t($.current)?.focus();
	}), se = d((t) => {
		let r = F.select("positionerElement");
		if (r && s(t, r)) F.context.beforeContentFocusGuardRef.current?.focus();
		else {
			S.flushSync(() => {
				F.setOpen(!1, f(u, t.nativeEvent, t.currentTarget));
			});
			let i = e(B.current);
			for (; i !== null && te(r, i) || i?.hasAttribute("aria-hidden");) {
				let e = i;
				if (i = n(i), i === e) break;
			}
			i?.focus();
		}
	});
	return L ? /* @__PURE__ */ ne(b.Fragment, { children: [
		/* @__PURE__ */ x(o, {
			ref: $,
			onFocus: oe
		}),
		/* @__PURE__ */ x(b.Fragment, { children: Q }, I),
		/* @__PURE__ */ x(o, {
			ref: F.context.triggerFocusTargetRef,
			onFocus: se
		})
	] }) : /* @__PURE__ */ x(b.Fragment, { children: Q }, I);
});
process.env.NODE_ENV !== "production" && (C.displayName = "PopoverTrigger");
//#endregion
export { C as t };

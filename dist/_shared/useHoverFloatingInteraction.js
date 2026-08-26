import { A as e, N as t, T as n, k as r } from "./popupStateMapping.js";
import { L as i, P as a, R as o, d as s, x as c } from "./floating-ui.utils.dom.js";
import { n as l } from "./event.js";
import { E as u, w as d, z as f } from "./owner.js";
import * as p from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHoverInteractionSharedState.js
var m = n("safe-polygon"), h = `button,a,[role="button"],select,[tabindex]:not([tabindex="-1"]),${f}`;
function g(e) {
	return e ? !!e.closest(h) : !1;
}
function _(e) {
	let n = p.useRef(void 0), r = p.useRef(!1), i = p.useRef(void 0), a = p.useRef(!0), o = p.useRef(!1), s = p.useRef(() => {}), c = p.useRef(!1), l = t(), u = t(), d = p.useRef(void 0);
	return p.useMemo(() => {
		let t = e.context.dataRef.current;
		return t.hoverInteractionState ||= {
			pointerTypeRef: n,
			interactedInsideRef: r,
			handlerRef: i,
			blockMouseMoveRef: a,
			performedPointerEventsMutationRef: o,
			unbindMouseMoveRef: s,
			restTimeoutPendingRef: c,
			openChangeTimeout: l,
			restTimeout: u,
			handleCloseOptionsRef: d
		}, t.hoverInteractionState;
	}, [
		e,
		n,
		r,
		i,
		a,
		o,
		s,
		c,
		l,
		u,
		d
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHoverFloatingInteraction.js
var v = new Set(["click", "mousedown"]);
function y(t, n = {}) {
	let l = "rootStore" in t ? t.rootStore : t, f = l.useState("open"), h = l.useState("floatingElement"), y = l.useState("domReferenceElement"), { dataRef: x } = l.context, { enabled: S = !0, closeDelay: C = 0, externalTree: w } = n, { pointerTypeRef: T, interactedInsideRef: E, handlerRef: D, performedPointerEventsMutationRef: O, unbindMouseMoveRef: k, restTimeoutPendingRef: A, openChangeTimeout: j, handleCloseOptionsRef: M } = _(l), N = e(w), P = r(), F = o(() => E.current ? !0 : x.current.openEvent ? v.has(x.current.openEvent.type) : !1), I = o(() => {
		let e = x.current.openEvent?.type;
		return e?.includes("mouse") && e !== "mousedown";
	}), L = p.useCallback((e, t = !0) => {
		let n = b(C, T.current);
		n && !D.current ? j.start(n, () => l.setOpen(!1, c(a, e))) : t && (j.clear(), l.setOpen(!1, c(a, e)));
	}, [
		C,
		D,
		l,
		T,
		j
	]), R = o(() => {
		k.current(), D.current = void 0;
	}), z = o(() => {
		if (O.current) {
			let e = d(h).body;
			e.style.pointerEvents = "", e.removeAttribute(m), O.current = !1;
		}
	}), B = o((e) => {
		if (!g(u(e))) {
			E.current = !1;
			return;
		}
		E.current = !0;
	});
	i(() => {
		f || (T.current = void 0, A.current = !1, E.current = !1, R(), z());
	}, [
		f,
		T,
		A,
		E,
		R,
		z
	]), p.useEffect(() => () => {
		R();
	}, [R]), p.useEffect(() => z, [z]), i(() => {
		if (S && f && M.current?.blockPointerEvents && I() && s(y) && h) {
			O.current = !0;
			let e = d(h).body;
			e.setAttribute(m, "");
			let t = y, n = h, r = N?.nodesRef.current.find((e) => e.id === P)?.context?.elements.floating;
			return r && (r.style.pointerEvents = ""), e.style.pointerEvents = "none", t.style.pointerEvents = "auto", n.style.pointerEvents = "auto", () => {
				e.style.pointerEvents = "", t.style.pointerEvents = "", n.style.pointerEvents = "";
			};
		}
	}, [
		S,
		f,
		y,
		h,
		M,
		I,
		N,
		P,
		O
	]), p.useEffect(() => {
		if (!S) return;
		function e(e) {
			if (F() || !x.current.floatingContext) return;
			let t = l.context.triggerElements;
			e.relatedTarget && t.hasElement(e.relatedTarget) || (z(), R(), F() || L(e));
		}
		function t(e) {
			j.clear(), z(), D.current?.(e), R();
		}
		function n(e) {
			F() || L(e, !1);
		}
		let r = h;
		return r && (r.addEventListener("mouseleave", e), r.addEventListener("mouseenter", t), r.addEventListener("mouseleave", n), r.addEventListener("pointerdown", B, !0)), () => {
			r && (r.removeEventListener("mouseleave", e), r.removeEventListener("mouseenter", t), r.removeEventListener("mouseleave", n), r.removeEventListener("pointerdown", B, !0));
		};
	});
}
function b(e, t) {
	return t && !l(t) ? 0 : typeof e == "function" ? e() : e;
}
//#endregion
export { m as n, _ as r, y as t };

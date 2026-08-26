import { A as e, M as t, T as n, W as r } from "./popupStateMapping.js";
import { P as i, R as a, d as o, x as s } from "./floating-ui.utils.dom.js";
import { n as c } from "./useOpenChangeComplete.js";
import { n as l } from "./event.js";
import { C as u, E as d, w as f, z as p } from "./owner.js";
import { n as m, r as h } from "./useHoverFloatingInteraction.js";
import * as g from "react";
import * as _ from "react-dom";
n("safe-polygon"), `${p}`;
function v(e, t, n) {
	if (n && !l(n)) return 0;
	if (typeof e == "number") return e;
	if (typeof e == "function") {
		let n = e();
		return typeof n == "number" ? n : n?.[t];
	}
	return e?.[t];
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useHoverReferenceInteraction.js
function y(e) {
	return typeof e == "function" ? e() : e;
}
var b = { current: null };
function x(t, n = {}) {
	let r = "rootStore" in t ? t.rootStore : t, { dataRef: d, events: p } = r.context, { enabled: x = !0, delay: S = 0, handleClose: C = null, mouseOnly: w = !1, restMs: T = 0, move: E = !0, triggerElementRef: D = b, externalTree: O, isActiveTrigger: k = !0 } = n, A = e(O), { pointerTypeRef: j, interactedInsideRef: M, handlerRef: N, blockMouseMoveRef: P, performedPointerEventsMutationRef: F, unbindMouseMoveRef: I, restTimeoutPendingRef: L, openChangeTimeout: R, restTimeout: z, handleCloseOptionsRef: B } = h(r), V = c(C), H = c(S), U = c(T);
	k && (B.current = V.current?.__options);
	let W = a(() => M.current ? !0 : d.current.openEvent ? ["click", "mousedown"].includes(d.current.openEvent.type) : !1), G = g.useCallback((e, t = !0) => {
		let n = v(H.current, "close", j.current);
		n && !N.current ? R.start(n, () => r.setOpen(!1, s(i, e))) : t && (R.clear(), r.setOpen(!1, s(i, e)));
	}, [
		H,
		N,
		r,
		j,
		R
	]), K = a(() => {
		I.current(), N.current = void 0;
	}), q = a(() => {
		if (F.current) {
			let e = f(r.select("domReferenceElement")).body;
			e.style.pointerEvents = "", e.removeAttribute(m), F.current = !1;
		}
	});
	g.useEffect(() => {
		if (!x) return;
		function e(e) {
			e.open || (R.clear(), z.clear(), P.current = !0, L.current = !1);
		}
		return p.on("openchange", e), () => {
			p.off("openchange", e);
		};
	}, [
		x,
		p,
		R,
		z,
		P,
		L
	]);
	let J = a((e) => {
		if (W() || !d.current.floatingContext) return;
		let t = r.context.triggerElements;
		e.relatedTarget && t.hasElement(e.relatedTarget) || V.current?.({
			...d.current.floatingContext,
			tree: A,
			x: e.clientX,
			y: e.clientY,
			onClose() {
				q(), K(), W() || G(e);
			}
		})(e);
	});
	return g.useEffect(() => {
		if (!x) return;
		let e = D.current ?? (k ? r.select("domReferenceElement") : null);
		if (!o(e)) return;
		function t(e) {
			if (R.clear(), P.current = !1, w && !l(j.current) || y(U.current) > 0 && !v(H.current, "open")) return;
			let t = v(H.current, "open", j.current), n = r.select("domReferenceElement"), a = r.context.triggerElements, o = (a.hasElement(e.target) || a.hasMatchingElement((t) => u(t, e.target))) && (!n || !u(n, e.target)), c = e.currentTarget ?? null;
			t ? R.start(t, () => {
				r.select("open") || r.setOpen(!0, s(i, e, c));
			}) : (!r.select("open") || o) && r.setOpen(!0, s(i, e, c));
		}
		function n(e) {
			if (W()) {
				q();
				return;
			}
			I.current();
			let t = f(r.select("domReferenceElement"));
			z.clear(), L.current = !1;
			let n = r.context.triggerElements;
			if (!(e.relatedTarget && n.hasElement(e.relatedTarget))) {
				if (V.current && d.current.floatingContext) {
					r.select("open") || R.clear(), N.current = V.current({
						...d.current.floatingContext,
						tree: A,
						x: e.clientX,
						y: e.clientY,
						onClose() {
							q(), K(), W() || G(e, !0);
						}
					});
					let n = N.current;
					n(e), t.addEventListener("mousemove", n), I.current = () => {
						t.removeEventListener("mousemove", n);
					};
					return;
				}
				(j.current !== "touch" || !u(r.select("floatingElement"), e.relatedTarget)) && G(e);
			}
		}
		function a(e) {
			J(e);
		}
		return r.select("open") && e.addEventListener("mouseleave", a), E && e.addEventListener("mousemove", t, { once: !0 }), e.addEventListener("mouseenter", t), e.addEventListener("mouseleave", n), () => {
			e.removeEventListener("mouseleave", a), E && e.removeEventListener("mousemove", t), e.removeEventListener("mouseenter", t), e.removeEventListener("mouseleave", n);
		};
	}, [
		K,
		q,
		P,
		d,
		H,
		G,
		r,
		x,
		V,
		J,
		k,
		W,
		w,
		E,
		j,
		U,
		z,
		L,
		R,
		D,
		A,
		I,
		N
	]), g.useMemo(() => {
		function e(e) {
			j.current = e.pointerType;
		}
		return {
			onPointerDown: e,
			onPointerEnter: e,
			onMouseMove(e) {
				let { nativeEvent: t } = e, n = e.currentTarget, a = r.select("domReferenceElement"), o = r.context.triggerElements, c = r.select("open"), d = (o.hasElement(e.target) || o.hasMatchingElement((t) => u(t, e.target))) && (!a || !u(a, e.target));
				if (w && !l(j.current) || c && !d || y(U.current) === 0 || !d && L.current && e.movementX ** 2 + e.movementY ** 2 < 2) return;
				z.clear();
				function f() {
					!P.current && (!c || d) && r.setOpen(!0, s(i, t, n));
				}
				j.current === "touch" ? _.flushSync(() => {
					f();
				}) : d && c ? f() : (L.current = !0, z.start(y(U.current), f));
			}
		};
	}, [
		P,
		w,
		r,
		j,
		U,
		z,
		L
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/safePolygon.js
function S(e, t) {
	let [n, r] = e, i = !1, a = t.length;
	for (let e = 0, o = a - 1; e < a; o = e++) {
		let [a, s] = t[e] || [0, 0], [c, l] = t[o] || [0, 0];
		s >= r != l >= r && n <= (c - a) * (r - s) / (l - s) + a && (i = !i);
	}
	return i;
}
function C(e, t) {
	return e[0] >= t.x && e[0] <= t.x + t.width && e[1] >= t.y && e[1] <= t.y + t.height;
}
function w(e = {}) {
	let { buffer: n = .5, blockPointerEvents: i = !1, requireIntent: a = !0 } = e, s = new t(), c = !1, l = null, f = null, p = typeof performance < "u" ? performance.now() : 0;
	function m(e, t) {
		let n = performance.now(), r = n - p;
		if (l === null || f === null || r === 0) return l = e, f = t, p = n, null;
		let i = e - l, a = t - f, o = Math.sqrt(i * i + a * a) / r;
		return l = e, f = t, p = n, o;
	}
	let h = ({ x: e, y: t, placement: i, elements: l, onClose: f, nodeId: p, tree: h }) => function(g) {
		function _() {
			s.clear(), f();
		}
		if (s.clear(), !l.domReference || !l.floating || i == null || e == null || t == null) return;
		let { clientX: v, clientY: y } = g, b = [v, y], x = d(g), w = g.type === "mouseleave", T = u(l.floating, x), E = u(l.domReference, x), D = l.domReference.getBoundingClientRect(), O = l.floating.getBoundingClientRect(), k = i.split("-")[0], A = e > O.right - O.width / 2, j = t > O.bottom - O.height / 2, M = C(b, D), N = O.width > D.width, P = O.height > D.height, F = (N ? D : O).left, I = (N ? D : O).right, L = (P ? D : O).top, R = (P ? D : O).bottom;
		if (T && (c = !0, !w)) return;
		if (E && (c = !1), E && !w) {
			c = !0;
			return;
		}
		if (w && o(g.relatedTarget) && u(l.floating, g.relatedTarget) || h && r(h.nodesRef.current, p).some(({ context: e }) => e?.open)) return;
		if (k === "top" && t >= D.bottom - 1 || k === "bottom" && t <= D.top + 1 || k === "left" && e >= D.right - 1 || k === "right" && e <= D.left + 1) return _();
		let z = [];
		switch (k) {
			case "top":
				z = [
					[F, D.top + 1],
					[F, O.bottom - 1],
					[I, O.bottom - 1],
					[I, D.top + 1]
				];
				break;
			case "bottom":
				z = [
					[F, O.top + 1],
					[F, D.bottom - 1],
					[I, D.bottom - 1],
					[I, O.top + 1]
				];
				break;
			case "left":
				z = [
					[O.right - 1, R],
					[O.right - 1, L],
					[D.left + 1, L],
					[D.left + 1, R]
				];
				break;
			case "right":
				z = [
					[D.right - 1, R],
					[D.right - 1, L],
					[O.left + 1, L],
					[O.left + 1, R]
				];
				break;
			default:
		}
		function B([e, t]) {
			switch (k) {
				case "top": return [
					[N ? e + n / 2 : A ? e + n * 4 : e - n * 4, t + n + 1],
					[N ? e - n / 2 : A ? e + n * 4 : e - n * 4, t + n + 1],
					...[[O.left, A || N ? O.bottom - n : O.top], [O.right, A ? N ? O.bottom - n : O.top : O.bottom - n]]
				];
				case "bottom": return [
					[N ? e + n / 2 : A ? e + n * 4 : e - n * 4, t - n],
					[N ? e - n / 2 : A ? e + n * 4 : e - n * 4, t - n],
					...[[O.left, A || N ? O.top + n : O.bottom], [O.right, A ? N ? O.top + n : O.bottom : O.top + n]]
				];
				case "left": {
					let r = [e + n + 1, P ? t + n / 2 : j ? t + n * 4 : t - n * 4], i = [e + n + 1, P ? t - n / 2 : j ? t + n * 4 : t - n * 4];
					return [
						...[[j || P ? O.right - n : O.left, O.top], [j ? P ? O.right - n : O.left : O.right - n, O.bottom]],
						r,
						i
					];
				}
				case "right": return [
					[e - n, P ? t + n / 2 : j ? t + n * 4 : t - n * 4],
					[e - n, P ? t - n / 2 : j ? t + n * 4 : t - n * 4],
					...[[j || P ? O.left + n : O.right, O.top], [j ? P ? O.left + n : O.right : O.left + n, O.bottom]]
				];
				default: return [];
			}
		}
		if (!S([v, y], z)) {
			if (c && !M) return _();
			if (!w && a) {
				let e = m(g.clientX, g.clientY);
				if (e !== null && e < .1) return _();
			}
			S([v, y], B([e, t])) ? !c && a && s.start(40, _) : _();
		}
	};
	return h.__options = { blockPointerEvents: i }, h;
}
//#endregion
export { x as n, v as r, w as t };

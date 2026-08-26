import { A as e, N as t, k as n } from "./popupStateMapping.js";
import { s as r } from "./useRenderElement.js";
import { E as i, L as a, R as o, f as s, k as c, x as l } from "./floating-ui.utils.dom.js";
import { n as u } from "./useOpenChangeComplete.js";
import { a as d, i as ee, o as f } from "./event.js";
import { C as p, E as te, F as m, I as h, N as g, P as _, S as v, T as y, k as b, w as x } from "./owner.js";
import { a as S, c as C, i as ne, l as re, n as w, o as ie, r as ae, s as oe, t as se } from "./composite.js";
import { i as ce } from "./InternalBackdrop.js";
import * as T from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useListNavigation.js
var le = "Escape";
function E(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function D(e, t) {
	return E(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function ue(e, t, n) {
	return E(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function de(e, t, n) {
	return E(t, n ? e === _ : e === m, e === g);
}
function fe(e, t, n, r) {
	return t === "both" || t === "horizontal" && r && r > 1 ? e === le : E(t, n ? e === m : e === _, e === h);
}
function O(t, r) {
	let m = "rootStore" in t ? t.rootStore : t, h = m.useState("open"), g = m.useState("floatingElement"), _ = m.useState("domReferenceElement"), le = m.context.dataRef, { listRef: E, activeIndex: O, onNavigate: pe = () => {}, enabled: k = !0, selectedIndex: A = null, allowEscape: me = !1, loopFocus: j = !1, nested: M = !1, rtl: N = !1, virtual: P = !1, focusItemOnOpen: F = "auto", focusItemOnHover: he = !0, openOnArrowKeyDown: ge = !0, disabledIndices: I = void 0, orientation: L = "vertical", parentOrientation: _e, cols: R = 1, scrollItemIntoView: ve = !0, itemSizes: ye, dense: be = !1, id: xe, resetOnPointerLeave: Se = !0, externalTree: Ce } = r;
	process.env.NODE_ENV !== "production" && (me && (j || console.warn("`useListNavigation` looping must be enabled to allow escaping."), P || console.warn("`useListNavigation` must be virtual to allow escaping.")), L === "vertical" && R > 1 && console.warn("In grid list navigation mode (`cols` > 1), the `orientation` should", "be either \"horizontal\" or \"both\"."));
	let z = u(y(g)), B = n(), V = e(Ce);
	a(() => {
		le.current.orientation = L;
	}, [le, L]);
	let we = b(_), H = T.useRef(F), U = T.useRef(A ?? -1), W = T.useRef(null), G = T.useRef(!0), K = o((e) => {
		pe(U.current === -1 ? null : U.current, e);
	}), Te = T.useRef(K), q = T.useRef(!!g), Ee = T.useRef(h), J = T.useRef(!1), Y = T.useRef(!1), De = u(I), X = u(h), Oe = u(ve), Z = u(A), ke = u(Se), Ae = o(() => {
		function e(e) {
			P ? V?.events.emit("virtualfocus", e) : ce(e, {
				sync: J.current,
				preventScroll: !0
			});
		}
		let t = E.current[U.current], n = Y.current;
		t && e(t), (J.current ? (e) => e() : requestAnimationFrame)(() => {
			let r = E.current[U.current] || t;
			if (!r) return;
			t || e(r);
			let i = Oe.current;
			i && Me && (n || !G.current) && r.scrollIntoView?.(typeof i == "boolean" ? {
				block: "nearest",
				inline: "nearest"
			} : i);
		});
	});
	a(() => {
		k && (h && g ? (U.current = A ?? -1, H.current && A != null && (Y.current = !0, K())) : q.current && (U.current = -1, Te.current()));
	}, [
		k,
		h,
		g,
		A,
		K
	]), a(() => {
		if (k) {
			if (!h) {
				J.current = !1;
				return;
			}
			if (g) if (O == null) {
				if (J.current = !1, Z.current != null) return;
				if (q.current && (U.current = -1, Ae()), (!Ee.current || !q.current) && H.current && (W.current != null || H.current === !0 && W.current == null)) {
					let e = 0, t = () => {
						E.current[0] == null ? (e < 2 && (e ? requestAnimationFrame : queueMicrotask)(t), e += 1) : (U.current = W.current == null || ue(W.current, L, N) || M ? oe(E) : ie(E), W.current = null, K());
					};
					t();
				}
			} else C(E, O) || (U.current = O, Ae(), Y.current = !1);
		}
	}, [
		k,
		h,
		g,
		O,
		Z,
		M,
		E,
		L,
		N,
		K,
		Ae,
		De
	]), a(() => {
		if (!k || g || !V || P || !q.current) return;
		let e = V.nodesRef.current, t = e.find((e) => e.id === B)?.context?.elements.floating, n = v(x(g)), r = e.some((e) => e.context && p(e.context.elements.floating, n));
		t && !r && G.current && t.focus({ preventScroll: !0 });
	}, [
		k,
		g,
		V,
		B,
		P
	]), a(() => {
		Te.current = K, Ee.current = h, q.current = !!g;
	}), a(() => {
		h || (W.current = null, H.current = F);
	}, [h, F]);
	let je = O != null, Me = T.useMemo(() => {
		function e(e) {
			if (!X.current) return;
			let t = E.current.indexOf(e.currentTarget);
			t !== -1 && U.current !== t && (U.current = t, K(e));
		}
		return {
			onFocus(t) {
				J.current = !0, e(t);
			},
			onClick: ({ currentTarget: e }) => e.focus({ preventScroll: !0 }),
			onMouseMove(t) {
				J.current = !0, Y.current = !1, he && e(t);
			},
			onPointerLeave(e) {
				if (!X.current || !G.current || e.pointerType === "touch") return;
				J.current = !0;
				let t = e.relatedTarget;
				!he || E.current.includes(t) || ke.current && (U.current = -1, K(e), P || z.current?.focus({ preventScroll: !0 }));
			}
		};
	}, [
		X,
		z,
		he,
		E,
		K,
		ke,
		P
	]), Ne = T.useCallback(() => _e ?? V?.nodesRef.current.find((e) => e.id === B)?.context?.dataRef?.current.orientation, [
		B,
		V,
		_e
	]), Q = o((e) => {
		if (G.current = !1, J.current = !0, e.which === 229 || !X.current && e.currentTarget === z.current) return;
		if (M && fe(e.key, L, N, R)) {
			D(e.key, Ne()) || f(e), m.setOpen(!1, l(c, e.nativeEvent)), s(_) && (P ? V?.events.emit("virtualfocus", _) : _.focus());
			return;
		}
		let t = U.current, n = oe(E, I), r = ie(E, I);
		if (we || (e.key === "Home" && (f(e), U.current = n, K(e)), e.key === "End" && (f(e), U.current = r, K(e))), R > 1) {
			let t = ye || Array.from({ length: E.current.length }, () => ({
				width: 1,
				height: 1
			})), i = se(t, R, be), a = i.findIndex((e) => e != null && !re(E, e, I)), o = i.reduce((e, t, n) => t != null && !re(E, t, I) ? n : e, -1), s = i[S({ current: i.map((e) => e == null ? null : E.current[e]) }, {
				event: e,
				orientation: L,
				loopFocus: j,
				rtl: N,
				cols: R,
				disabledIndices: ne([...(typeof I == "function" ? null : I) || E.current.map((e, t) => re(E, t, I) ? t : void 0), void 0], i),
				minIndex: a,
				maxIndex: o,
				prevIndex: ae(U.current > r ? n : U.current, t, i, R, e.key === "ArrowDown" ? "bl" : e.key === (N ? "ArrowLeft" : "ArrowRight") ? "tr" : "tl"),
				stopEvent: !0
			})];
			if (s != null && (U.current = s, K(e)), L === "both") return;
		}
		if (D(e.key, L)) {
			if (f(e), h && !P && v(e.currentTarget.ownerDocument) === e.currentTarget) {
				U.current = ue(e.key, L, N) ? n : r, K(e);
				return;
			}
			ue(e.key, L, N) ? j ? t >= r ? me && t !== E.current.length ? U.current = -1 : (J.current = !1, U.current = n) : U.current = w(E, {
				startingIndex: t,
				disabledIndices: I
			}) : U.current = Math.min(r, w(E, {
				startingIndex: t,
				disabledIndices: I
			})) : j ? t <= n ? me && t !== -1 ? U.current = E.current.length : (J.current = !1, U.current = r) : U.current = w(E, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: I
			}) : U.current = Math.max(n, w(E, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: I
			})), C(E, U.current) && (U.current = -1), K(e);
		}
	}), Pe = T.useMemo(() => P && h && je && { "aria-activedescendant": `${xe}-${O}` }, [
		P,
		h,
		je,
		xe,
		O
	]), Fe = T.useMemo(() => ({
		"aria-orientation": L === "both" ? void 0 : L,
		...we ? {} : Pe,
		onKeyDown(e) {
			if (e.key === "Tab" && e.shiftKey && h && !P) {
				let t = te(e.nativeEvent);
				if (t && !p(z.current, t)) return;
				f(e), m.setOpen(!1, l(i, e.nativeEvent)), s(_) && _.focus();
				return;
			}
			Q(e);
		},
		onPointerMove() {
			G.current = !0;
		}
	}), [
		Pe,
		Q,
		z,
		L,
		we,
		m,
		h,
		P,
		_
	]), $ = T.useMemo(() => {
		function e(e) {
			F === "auto" && ee(e.nativeEvent) && (H.current = !P);
		}
		function t(e) {
			H.current = F, F === "auto" && d(e.nativeEvent) && (H.current = !0);
		}
		return {
			onKeyDown(e) {
				let t = m.select("open");
				G.current = !1;
				let n = e.key.startsWith("Arrow"), r = de(e.key, Ne(), N), i = D(e.key, L), a = (M ? r : i) || e.key === "Enter" || e.key.trim() === "";
				if (P && t) return Q(e);
				if (!(!t && !ge && n)) {
					if (a) {
						let t = D(e.key, Ne());
						W.current = M && t ? null : e.key;
					}
					if (M) {
						r && (f(e), t ? (U.current = oe(E, De.current), K(e)) : m.setOpen(!0, l(c, e.nativeEvent, e.currentTarget)));
						return;
					}
					i && (Z.current != null && (U.current = Z.current), f(e), !t && ge ? m.setOpen(!0, l(c, e.nativeEvent, e.currentTarget)) : Q(e), t && K(e));
				}
			},
			onFocus(e) {
				m.select("open") && !P && (U.current = -1, K(e));
			},
			onPointerDown: t,
			onPointerEnter: t,
			onMouseDown: e,
			onClick: e
		};
	}, [
		Q,
		De,
		F,
		E,
		M,
		K,
		m,
		ge,
		L,
		Ne,
		N,
		Z,
		P
	]), Ie = T.useMemo(() => ({
		...Pe,
		...$
	}), [Pe, $]);
	return T.useMemo(() => k ? {
		reference: Ie,
		floating: Fe,
		item: Me,
		trigger: $
	} : {}, [
		k,
		Ie,
		Fe,
		$,
		Me
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useTypeahead.js
function pe(e, n) {
	let i = "rootStore" in e ? e.rootStore : e, s = i.useState("open"), c = i.context.dataRef, { listRef: l, activeIndex: u, onMatch: d, onTypingChange: ee, enabled: p = !0, findMatch: te = null, resetMs: m = 750, ignoreKeys: h = r, selectedIndex: g = null } = n, _ = t(), v = T.useRef(""), y = T.useRef(g ?? u ?? -1), b = T.useRef(null);
	a(() => {
		s && (_.clear(), b.current = null, v.current = "");
	}, [s, _]), a(() => {
		s && v.current === "" && (y.current = g ?? u ?? -1);
	}, [
		s,
		g,
		u
	]);
	let x = o((e) => {
		e ? c.current.typing || (c.current.typing = e, ee?.(e)) : c.current.typing && (c.current.typing = e, ee?.(e));
	}), S = o((e) => {
		function t(e, t, n) {
			let r = te ? te(t, n) : t.find((e) => e?.toLocaleLowerCase().indexOf(n.toLocaleLowerCase()) === 0);
			return r ? e.indexOf(r) : -1;
		}
		let n = l.current;
		if (v.current.length > 0 && v.current[0] !== " " && (t(n, n, v.current) === -1 ? x(!1) : e.key === " " && f(e)), n == null || h.includes(e.key) || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		s && e.key !== " " && (f(e), x(!0)), n.every((e) => e ? e[0]?.toLocaleLowerCase() !== e[1]?.toLocaleLowerCase() : !0) && v.current === e.key && (v.current = "", y.current = b.current), v.current += e.key, _.start(m, () => {
			v.current = "", y.current = b.current, x(!1);
		});
		let r = y.current, i = t(n, [...n.slice((r || 0) + 1), ...n.slice(0, (r || 0) + 1)], v.current);
		i === -1 ? e.key !== " " && (v.current = "", x(!1)) : (d?.(i), b.current = i);
	}), C = T.useMemo(() => ({ onKeyDown: S }), [S]), ne = T.useMemo(() => ({
		onKeyDown: S,
		onKeyUp(e) {
			e.key === " " && x(!1);
		}
	}), [S, x]);
	return T.useMemo(() => p ? {
		reference: C,
		floating: ne
	} : {}, [
		p,
		C,
		ne
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/getPseudoElementBounds.js
function k(e) {
	let t = e.getBoundingClientRect();
	if (process.env.NODE_ENV === "test") return t;
	let n = window.getComputedStyle(e, "::before"), r = window.getComputedStyle(e, "::after");
	if (!(n.content !== "none" || r.content !== "none")) return t;
	let i = parseFloat(n.width) || 0, a = parseFloat(n.height) || 0, o = parseFloat(r.width) || 0, s = parseFloat(r.height) || 0, c = Math.max(t.width, i, o), l = Math.max(t.height, a, s), u = c - t.width, d = l - t.height;
	return {
		left: t.left - u / 2,
		right: t.right + u / 2,
		top: t.top - d / 2,
		bottom: t.bottom + d / 2
	};
}
//#endregion
export { pe as n, O as r, k as t };

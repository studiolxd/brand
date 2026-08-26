import { A as e, B as t, C as n, F as r, H as i, M as a, N as o, P as s, R as c, T as l, U as u, V as d, W as f, w as p, z as m } from "./popupStateMapping.js";
import { f as h, l as g, p as _ } from "./useRenderElement.js";
import { E as ee, L as v, R as y, a as b, f as x, h as te, l as S, t as C, x as ne } from "./floating-ui.utils.dom.js";
import { c as w, l as re, n as ie, s as T } from "./useOpenChangeComplete.js";
import { a as ae, d as oe, i as se, o as ce, s as le } from "./event.js";
import { C as E, E as D, S as O, T as ue, k as de, t as k, w as A } from "./owner.js";
import { t as fe } from "./visuallyHidden.js";
import * as j from "react";
import { jsx as pe, jsxs as me } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useScrollLock.js
var M = {}, he = {}, ge = "";
function N(e) {
	if (typeof document > "u") return !1;
	let t = k(e);
	return S(t).innerWidth - t.documentElement.clientWidth > 0;
}
function P(e) {
	let t = k(e), n = t.documentElement, r = t.body, i = te(n) ? n : r, a = i.style.overflow;
	return i.style.overflow = "hidden", () => {
		i.style.overflow = a;
	};
}
function F(e) {
	let t = k(e), n = t.documentElement, r = t.body, i = S(n), a = 0, o = 0, s = w.create(), c = typeof CSS < "u" && CSS.supports?.("scrollbar-gutter", "stable");
	if (oe && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let e = i.getComputedStyle(n), t = i.getComputedStyle(r), s = (e.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, M = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, ge = n.style.scrollBehavior, he = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let l = n.scrollHeight > n.clientHeight, u = n.scrollWidth > n.clientWidth, d = e.overflowY === "scroll" || t.overflowY === "scroll", f = e.overflowX === "scroll" || t.overflowX === "scroll", p = Math.max(0, i.innerWidth - n.clientWidth), m = Math.max(0, i.innerHeight - n.clientHeight), h = parseFloat(t.marginTop) + parseFloat(t.marginBottom), g = parseFloat(t.marginLeft) + parseFloat(t.marginRight), _ = te(n) ? n : r;
		if (c) {
			n.style.scrollbarGutter = s, _.style.overflowY = "hidden", _.style.overflowX = "hidden";
			return;
		}
		Object.assign(n.style, {
			scrollbarGutter: s,
			overflowY: "hidden",
			overflowX: "hidden"
		}), (l || d) && (n.style.overflowY = "scroll"), (u || f) && (n.style.overflowX = "scroll"), Object.assign(r.style, {
			position: "relative",
			height: h || m ? `calc(100dvh - ${h + m}px)` : "100dvh",
			width: g || p ? `calc(100vw - ${g + p}px)` : "100vw",
			boxSizing: "border-box",
			overflow: "hidden",
			scrollBehavior: "unset"
		}), r.scrollTop = a, r.scrollLeft = o, n.setAttribute("data-base-ui-scroll-locked", ""), n.style.scrollBehavior = "unset";
	}
	function u() {
		Object.assign(n.style, M), Object.assign(r.style, he), c || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = ge);
	}
	function d() {
		u(), s.request(l);
	}
	return l(), i.addEventListener("resize", d), () => {
		s.cancel(), u(), typeof i.removeEventListener == "function" && i.removeEventListener("resize", d);
	};
}
var I = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = a.create();
	timeoutUnlock = a.create();
	acquire(e) {
		return this.lockCount += 1, this.lockCount === 1 && this.restore === null && this.timeoutLock.start(0, () => this.lock(e)), this.release;
	}
	release = () => {
		--this.lockCount, this.lockCount === 0 && this.restore && this.timeoutUnlock.start(0, this.unlock);
	};
	unlock = () => {
		this.lockCount === 0 && this.restore && (this.restore?.(), this.restore = null);
	};
	lock(e) {
		if (this.lockCount === 0 || this.restore !== null) return;
		let t = k(e).documentElement, n = S(t).getComputedStyle(t).overflowY;
		if (n === "hidden" || n === "clip") {
			this.restore = g;
			return;
		}
		this.restore = le || !N(e) ? P(e) : F(e);
	}
}();
function L(e = !0, t = null) {
	v(() => {
		if (e) return I.acquire(t);
	}, [e, t]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/enqueueFocus.js
var R = 0;
function z(e, t = {}) {
	let { preventScroll: n = !1, cancelPrevious: r = !0, sync: i = !1 } = t;
	r && cancelAnimationFrame(R);
	let a = () => e?.focus({ preventScroll: n });
	i ? a() : R = requestAnimationFrame(a);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/markOthers.js
var B = {
	inert: /* @__PURE__ */ new WeakMap(),
	"aria-hidden": /* @__PURE__ */ new WeakMap(),
	none: /* @__PURE__ */ new WeakMap()
};
function V(e) {
	return e === "inert" ? B.inert : e === "aria-hidden" ? B["aria-hidden"] : B.none;
}
var H = /* @__PURE__ */ new WeakSet(), U = {}, W = 0, G = (e) => e && (e.host || G(e.parentNode)), K = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = G(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null);
function _e(e, t, n, r) {
	let i = "data-base-ui-inert", a = r ? "inert" : n ? "aria-hidden" : null, o = K(t, e), s = /* @__PURE__ */ new Set(), c = new Set(o), l = [];
	U[i] || (U[i] = /* @__PURE__ */ new WeakMap());
	let u = U[i];
	o.forEach(d), f(t), s.clear();
	function d(e) {
		!e || s.has(e) || (s.add(e), e.parentNode && d(e.parentNode));
	}
	function f(e) {
		!e || c.has(e) || [].forEach.call(e.children, (e) => {
			if (b(e) !== "script") if (s.has(e)) f(e);
			else {
				let t = a ? e.getAttribute(a) : null, n = t !== null && t !== "false", r = V(a), o = (r.get(e) || 0) + 1, s = (u.get(e) || 0) + 1;
				r.set(e, o), u.set(e, s), l.push(e), o === 1 && n && H.add(e), s === 1 && e.setAttribute(i, ""), !n && a && e.setAttribute(a, a === "inert" ? "" : "true");
			}
		});
	}
	return W += 1, () => {
		l.forEach((e) => {
			let t = V(a), n = (t.get(e) || 0) - 1, r = (u.get(e) || 0) - 1;
			t.set(e, n), u.set(e, r), n || (!H.has(e) && a && e.removeAttribute(a), H.delete(e)), r || e.removeAttribute(i);
		}), --W, W || (B.inert = /* @__PURE__ */ new WeakMap(), B["aria-hidden"] = /* @__PURE__ */ new WeakMap(), B.none = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), U = {});
	};
}
function ve(e, t = !1, n = !1) {
	let r = A(e[0]).body;
	return _e(e.concat(Array.from(r.querySelectorAll("[aria-live]"))), r, t, n);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingFocusManager.js
function ye(e, t) {
	let n = S(e.target);
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || "keyboard" : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var q = 20, J = [];
function be() {
	J = J.filter((e) => e.isConnected);
}
function xe(e) {
	be(), e && b(e) !== "body" && (J.push(e), J.length > q && (J = J.slice(-q)));
}
function Se() {
	return be(), J[J.length - 1];
}
function Ce(e) {
	if (!e) return null;
	let t = c();
	return d(e, t) ? e : i(e, t)[0] || e;
}
function we(e) {
	return !e || !e.isConnected ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : C(e).display !== "none";
}
function Te(e, n) {
	if (!n.current.includes("floating") && !e.getAttribute("role")?.includes("dialog")) return;
	let r = c(), i = t(e, r).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return d(e, r) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), a = e.getAttribute("tabindex");
	n.current.includes("floating") || i.length === 0 ? a !== "0" && e.setAttribute("tabindex", "0") : (a !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function Ee(t) {
	let { context: a, children: d, disabled: h = !1, order: g = ["content"], initialFocus: b = !0, returnFocus: te = !0, restoreFocus: S = !1, modal: C = !0, closeOnFocusOut: w = !0, openInteractionType: oe = "", getInsideElements: le = () => [], nextFocusableElement: k, previousFocusableElement: M, beforeContentFocusGuardRef: he, externalTree: ge } = t, N = "rootStore" in a ? a.rootStore : a, P = N.useState("open"), F = N.useState("domReferenceElement"), I = N.useState("floatingElement"), { events: L, dataRef: R } = N.context, B = y(() => R.current.floatingContext?.nodeId), V = y(le), H = b === !1, U = de(F) && H, W = ie(g), G = ie(b), K = ie(te), _e = ie(oe), q = e(ge), J = n(), Ee = j.useRef(null), De = j.useRef(null), Y = j.useRef(!1), X = j.useRef(!1), Oe = j.useRef(!1), ke = j.useRef(-1), Ae = j.useRef(""), je = j.useRef(""), Me = o(), Ne = o(), Pe = re(), Fe = J != null, Z = ue(I), Q = y((e = Z) => e ? i(e, c()) : []), $ = y((e) => {
		let t = Q(e);
		return W.current.map(() => t).filter(Boolean).flat();
	});
	j.useEffect(() => {
		if (h || !C) return;
		function e(e) {
			e.key === "Tab" && E(Z, O(A(Z))) && Q().length === 0 && !U && ce(e);
		}
		let t = A(Z);
		return t.addEventListener("keydown", e), () => {
			t.removeEventListener("keydown", e);
		};
	}, [
		h,
		F,
		Z,
		C,
		W,
		U,
		Q,
		$
	]), j.useEffect(() => {
		if (h || !I) return;
		function e(e) {
			let t = D(e), n = Q().indexOf(t);
			n !== -1 && (ke.current = n);
		}
		return I.addEventListener("focusin", e), () => {
			I.removeEventListener("focusin", e);
		};
	}, [
		h,
		I,
		Q
	]), j.useEffect(() => {
		if (h || !P) return;
		let e = A(Z);
		function t() {
			Oe.current = !1;
		}
		function n(e) {
			let t = D(e);
			Oe.current = !(E(I, t) || E(F, t) || E(J?.portalNode, t)), je.current = e.pointerType || "keyboard";
		}
		function r() {
			je.current = "keyboard";
		}
		return e.addEventListener("pointerdown", n, !0), e.addEventListener("pointerup", t, !0), e.addEventListener("pointercancel", t, !0), e.addEventListener("keydown", r, !0), () => {
			e.removeEventListener("pointerdown", n, !0), e.removeEventListener("pointerup", t, !0), e.removeEventListener("pointercancel", t, !0), e.removeEventListener("keydown", r, !0);
		};
	}, [
		h,
		I,
		F,
		Z,
		P,
		J
	]), j.useEffect(() => {
		if (h || !w) return;
		function e() {
			X.current = !0, Ne.start(0, () => {
				X.current = !1;
			});
		}
		function t(e) {
			let t = e.relatedTarget, n = e.currentTarget, r = D(e);
			queueMicrotask(() => {
				let i = B(), a = N.context.triggerElements, o = !(E(F, t) || E(I, t) || E(t, I) || E(J?.portalNode, t) || t != null && a.hasElement(t) || a.hasMatchingElement((e) => E(e, t)) || t?.hasAttribute(l("focus-guard")) || q && (f(q.nodesRef.current, i).find((e) => E(e.context?.elements.floating, t) || E(e.context?.elements.domReference, t)) || u(q.nodesRef.current, i).find((e) => [e.context?.elements.floating, ue(e.context?.elements.floating)].includes(t) || e.context?.elements.domReference === t)));
				if (n === F && Z && Te(Z, W), S && n !== F && !we(r) && O(A(Z)) === A(Z).body) {
					if (x(Z) && (Z.focus(), S === "popup")) {
						Pe.request(() => {
							Z.focus();
						});
						return;
					}
					let e = ke.current, t = Q(), n = t[e] || t[t.length - 1] || Z;
					x(n) && n.focus();
				}
				if (R.current.insideReactTree) {
					R.current.insideReactTree = !1;
					return;
				}
				(U || !C) && t && o && !X.current && (U || t !== Se()) && (Y.current = !0, N.setOpen(!1, ne(ee, e)));
			});
		}
		function n() {
			Oe.current || (R.current.insideReactTree = !0, Me.start(0, () => {
				R.current.insideReactTree = !1;
			}));
		}
		let r = x(F) ? F : null, i = [];
		if (!(!I && !r)) return r && (r.addEventListener("focusout", t), r.addEventListener("pointerdown", e), i.push(() => {
			r.removeEventListener("focusout", t), r.removeEventListener("pointerdown", e);
		})), I && (I.addEventListener("focusout", t), J && (I.addEventListener("focusout", n, !0), i.push(() => {
			I.removeEventListener("focusout", n, !0);
		})), i.push(() => {
			I.removeEventListener("focusout", t);
		})), () => {
			i.forEach((e) => {
				e();
			});
		};
	}, [
		h,
		F,
		I,
		Z,
		C,
		q,
		J,
		N,
		w,
		S,
		Q,
		U,
		B,
		W,
		R,
		Me,
		Ne,
		Pe
	]);
	let Ie = j.useRef(null), Le = j.useRef(null), Re = _(Ie, he, J?.beforeInsideRef), ze = _(Le, J?.afterInsideRef);
	j.useEffect(() => {
		if (h || !I || !P) return;
		let e = Array.from(J?.portalNode?.querySelectorAll(`[${l("portal")}]`) || []), t = ve([
			I,
			(q ? u(q.nodesRef.current, B()) : []).find((e) => de(e.context?.elements.domReference || null))?.context?.elements.domReference,
			...e,
			...V(),
			Ee.current,
			De.current,
			Ie.current,
			Le.current,
			J?.beforeOutsideRef.current,
			J?.afterOutsideRef.current,
			T(M),
			T(k),
			U ? F : null
		].filter((e) => e != null), C || U);
		return () => {
			t();
		};
	}, [
		P,
		h,
		F,
		I,
		C,
		W,
		J,
		U,
		q,
		B,
		V,
		k,
		M
	]), v(() => {
		if (!P || h || !x(Z)) return;
		let e = O(A(Z));
		queueMicrotask(() => {
			let t = $(Z), n = G.current, r = typeof n == "function" ? n(_e.current || "") : n;
			if (r === void 0 || r === !1) return;
			let i;
			i = r === !0 || r === null ? t[0] || Z : T(r), i = i || t[0] || Z, !E(Z, e) && z(i, { preventScroll: i === Z });
		});
	}, [
		h,
		P,
		Z,
		H,
		$,
		G,
		_e
	]), v(() => {
		if (h || !Z) return;
		let e = A(Z);
		xe(O(e));
		function t(e) {
			if (e.open || (Ae.current = ye(e.nativeEvent, je.current)), e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave" && (Y.current = !0), e.reason === "outside-press") if (e.nested) Y.current = !1;
			else if (se(e.nativeEvent) || ae(e.nativeEvent)) Y.current = !1;
			else {
				let e = !1;
				document.createElement("div").focus({ get preventScroll() {
					return e = !0, !1;
				} }), e ? Y.current = !1 : Y.current = !0;
			}
		}
		L.on("openchange", t);
		let n = e.createElement("span");
		n.setAttribute("tabindex", "-1"), n.setAttribute("aria-hidden", "true"), Object.assign(n.style, fe), Fe && F && F.insertAdjacentElement("afterend", n);
		function r() {
			let e = K.current, t = typeof e == "function" ? e(Ae.current) : e;
			if (t === void 0 || t === !1) return null;
			if (t === null && (t = !0), typeof t == "boolean") {
				let e = F || Se();
				return e && e.isConnected ? e : n;
			}
			let r = F || Se() || n;
			return T(t) || r;
		}
		return () => {
			L.off("openchange", t);
			let i = O(e), a = E(I, i) || q && f(q.nodesRef.current, B(), !1).some((e) => E(e.context?.elements.floating, i)), o = r();
			queueMicrotask(() => {
				let t = Ce(o), r = typeof K.current != "boolean";
				K.current && !Y.current && x(t) && (!(!r && t !== i && i !== e.body) || a) && t.focus({ preventScroll: !0 }), n.remove();
			});
		};
	}, [
		h,
		I,
		Z,
		K,
		R,
		L,
		q,
		Fe,
		F,
		B
	]), j.useEffect(() => {
		queueMicrotask(() => {
			Y.current = !1;
		});
	}, [h]), j.useEffect(() => {
		if (h || !P) return;
		function e(e) {
			D(e)?.closest("[data-base-ui-click-trigger]") && (X.current = !0);
		}
		let t = A(Z);
		return t.addEventListener("pointerdown", e, !0), () => {
			t.removeEventListener("pointerdown", e, !0);
		};
	}, [
		h,
		P,
		Z
	]), v(() => {
		if (!h && J) return J.setFocusManagerState({
			modal: C,
			closeOnFocusOut: w,
			open: P,
			onOpenChange: N.setOpen,
			domReference: F
		}), () => {
			J.setFocusManagerState(null);
		};
	}, [
		h,
		J,
		C,
		P,
		N,
		w,
		F
	]), v(() => {
		if (!(h || !Z)) return Te(Z, W), () => {
			queueMicrotask(be);
		};
	}, [
		h,
		Z,
		W
	]);
	let Be = !h && (C ? !U : !0) && (Fe || C);
	return /* @__PURE__ */ me(j.Fragment, { children: [
		Be && /* @__PURE__ */ pe(p, {
			"data-type": "inside",
			ref: Re,
			onFocus: (e) => {
				if (C) {
					let e = $();
					z(e[e.length - 1]);
				} else J?.portalNode && (Y.current = !1, m(e, J.portalNode) ? s(F)?.focus() : T(M ?? J.beforeOutsideRef)?.focus());
			}
		}),
		d,
		Be && /* @__PURE__ */ pe(p, {
			"data-type": "inside",
			ref: ze,
			onFocus: (e) => {
				C ? z($()[0]) : J?.portalNode && (w && (Y.current = !0), m(e, J.portalNode) ? r(F)?.focus() : T(k ?? J.afterOutsideRef)?.focus());
			}
		})
	] });
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/inertValue.js
function De(e) {
	return h(19) ? e : e ? "true" : void 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/InternalBackdrop.js
var Y = /* @__PURE__ */ j.forwardRef(function(e, t) {
	let { cutout: n, ...r } = e, i;
	if (n) {
		let e = n?.getBoundingClientRect();
		i = `polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% 0%,
      ${e.left}px ${e.top}px,
      ${e.left}px ${e.bottom}px,
      ${e.right}px ${e.bottom}px,
      ${e.right}px ${e.top}px,
      ${e.left}px ${e.top}px
    )`;
	}
	return /* @__PURE__ */ pe("div", {
		ref: t,
		role: "presentation",
		"data-base-ui-inert": "",
		...r,
		style: {
			position: "fixed",
			inset: 0,
			userSelect: "none",
			WebkitUserSelect: "none",
			clipPath: i
		}
	});
});
process.env.NODE_ENV !== "production" && (Y.displayName = "InternalBackdrop");
//#endregion
export { L as a, z as i, De as n, Ee as r, Y as t };

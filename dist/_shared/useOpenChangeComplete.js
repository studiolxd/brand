import { h as e } from "./useRenderElement.js";
import { L as t, R as n } from "./floating-ui.utils.dom.js";
import * as r from "react";
import * as i from "react-dom";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useOnMount.js
var a = [];
function o(e) {
	r.useEffect(e, a);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useAnimationFrame.js
var s = null, c = globalThis.requestAnimationFrame, l = new class {
	callbacks = [];
	callbacksCount = 0;
	nextId = 1;
	startId = 1;
	isScheduled = !1;
	tick = (e) => {
		this.isScheduled = !1;
		let t = this.callbacks, n = this.callbacksCount;
		if (this.callbacks = [], this.callbacksCount = 0, this.startId = this.nextId, n > 0) for (let n = 0; n < t.length; n += 1) t[n]?.(e);
	};
	request(e) {
		let t = this.nextId;
		this.nextId += 1, this.callbacks.push(e), this.callbacksCount += 1;
		let n = process.env.NODE_ENV === "test" && c !== requestAnimationFrame && (c = requestAnimationFrame, !0);
		return (!this.isScheduled || n) && (requestAnimationFrame(this.tick), this.isScheduled = !0), t;
	}
	cancel(e) {
		let t = e - this.startId;
		t < 0 || t >= this.callbacks.length || (this.callbacks[t] = null, --this.callbacksCount);
	}
}(), u = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return l.request(e);
	}
	static cancel(e) {
		return l.cancel(e);
	}
	currentId = s;
	request(e) {
		this.cancel(), this.currentId = l.request(() => {
			this.currentId = s, e();
		});
	}
	cancel = () => {
		this.currentId !== s && (l.cancel(this.currentId), this.currentId = s);
	};
	disposeEffect = () => this.cancel;
};
function d() {
	let t = e(u.create).current;
	return o(t.disposeEffect), t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/resolveRef.js
function f(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useAnimationsFinished.js
function p(e, t = !1, r = !0) {
	let a = d();
	return n((n, o = null) => {
		a.cancel();
		let s = f(e);
		s != null && (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED ? n() : a.request(() => {
			function e() {
				s && Promise.all(s.getAnimations().map((e) => e.finished)).then(() => {
					o != null && o.aborted || i.flushSync(n);
				}).catch(() => {
					if (r) {
						if (o != null && o.aborted) return;
						i.flushSync(n);
					} else s.getAnimations().length > 0 && s.getAnimations().some((e) => e.pending || e.playState !== "finished") && e();
				});
			}
			t ? a.request(e) : e();
		}));
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js
function m(e, n = !1, a = !1) {
	let [o, s] = r.useState(e && n ? "idle" : void 0), [c, l] = r.useState(e);
	return e && !c && (l(!0), s("starting")), !e && c && o !== "ending" && !a && s("ending"), !e && !c && o === "ending" && s(void 0), t(() => {
		if (!e && c && o !== "ending" && a) {
			let e = u.request(() => {
				s("ending");
			});
			return () => {
				u.cancel(e);
			};
		}
	}, [
		e,
		c,
		o,
		a
	]), t(() => {
		if (!e || n) return;
		let t = u.request(() => {
			i.flushSync(() => {
				s(void 0);
			});
		});
		return () => {
			u.cancel(t);
		};
	}, [n, e]), t(() => {
		if (!e || !n) return;
		e && c && o !== "idle" && s("starting");
		let t = u.request(() => {
			s("idle");
		});
		return () => {
			u.cancel(t);
		};
	}, [
		n,
		e,
		c,
		s,
		o
	]), r.useMemo(() => ({
		mounted: c,
		setMounted: l,
		transitionStatus: o
	}), [c, o]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js
var h = /* @__PURE__ */ function(e) {
	return e.startingStyle = "data-starting-style", e.endingStyle = "data-ending-style", e;
}({}), g = { [h.startingStyle]: "" }, _ = { [h.endingStyle]: "" }, v = { transitionStatus(e) {
	return e === "starting" ? g : e === "ending" ? _ : null;
} };
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useValueAsRef.js
function y(n) {
	let r = e(b, n).current;
	return r.next = n, t(r.effect), r;
}
function b(e) {
	let t = {
		current: e,
		next: e,
		effect: () => {
			t.current = t.next;
		}
	};
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useOpenChangeComplete.js
function x(e) {
	let { enabled: t = !0, open: i, ref: a, onComplete: o } = e, s = y(i), c = n(o), l = p(a, i);
	r.useEffect(() => {
		t && l(() => {
			i === s.current && c();
		});
	}, [
		t,
		i,
		c,
		l,
		s
	]);
}
//#endregion
export { m as a, u as c, v as i, d as l, y as n, p as o, h as r, f as s, x as t, o as u };

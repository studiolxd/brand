'use client';
import { Component as e } from "react";
//#region src/stories/atoms/ErrorBoundary/ErrorBoundary.tsx
var t = class extends e {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	componentDidCatch(e, t) {
		this.props.onError?.(e, t);
	}
	render() {
		let { failed: e } = this.state, { children: t, fallback: n = null } = this.props;
		return e ? n : t;
	}
};
//#endregion
export { t as ErrorBoundary };

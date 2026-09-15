import { EMAIL_FONT_FILENAME as e, EMAIL_LOGO_FILENAME as t, emailLogoWidthFor as n } from "./brand-assets.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { Body as o, Button as s, Container as c, Font as l, Head as u, Heading as d, Hr as f, Html as p, Img as m, Link as h, Preview as g, Section as _, Text as v } from "react-email";
//#region src/stories/email/emailTokens.ts
var y = {
	"--email-max-width": "600px",
	"--email-font-family": "\"Google Sans Flex\", system-ui, sans-serif",
	"--email-font-size": "20px",
	"--email-font-weight": "300",
	"--email-font-weight-range": "1 1000",
	"--email-line-height": "1.5",
	"--email-border-width": "1px",
	"--email-canvas-padding-block": "24px",
	"--email-canvas-padding-inline": "12px",
	"--email-padding-block": "24px",
	"--email-padding-inline": "24px",
	"--email-brand-padding-block": "16px",
	"--email-brand-padding-inline": "16px",
	"--email-opt-out-margin-block-start": "16px",
	"--email-heading-font-size": "32px",
	"--email-heading-font-weight": "500",
	"--email-heading-line-height": "1.1",
	"--email-heading-margin-block-end": "12px",
	"--email-text-margin-block-end": "16px",
	"--email-note-font-size": "16px",
	"--email-note-line-height": "1.65",
	"--email-text-emphasis-font-weight": "500",
	"--email-heading-2-font-size": "24px",
	"--email-heading-2-font-weight": "500",
	"--email-heading-2-line-height": "1.3",
	"--email-heading-2-margin-block-start": "24px",
	"--email-heading-2-margin-block-end": "12px",
	"--email-heading-2-color": "#111e30",
	"--email-list-margin-block-end": "16px",
	"--email-list-padding-inline-start": "24px",
	"--email-list-item-margin-block-end": "8px",
	"--email-quote-border-width": "2px",
	"--email-quote-border-color": "#4a4a4a",
	"--email-quote-padding-inline-start": "12px",
	"--email-quote-margin-block-end": "16px",
	"--email-divider-width": "1px",
	"--email-divider-color": "#d0d0d0",
	"--email-divider-margin-block": "24px",
	"--email-tag-font-size": "16px",
	"--email-tag-font-weight": "500",
	"--email-tag-border-radius": "9999px",
	"--email-tag-padding-block": "4px",
	"--email-tag-padding-inline": "12px",
	"--email-tag-margin-block-end": "16px",
	"--email-tone-success-bg": "#006616",
	"--email-tone-success-color": "#ffffff",
	"--email-tone-warning-bg": "#ffcd00",
	"--email-tone-warning-color": "#111e30",
	"--email-tone-error-bg": "#b30000",
	"--email-tone-error-color": "#ffffff",
	"--email-button-bg": "#baabff",
	"--email-button-color": "#111e30",
	"--email-button-hover-bg": "#ffcd00",
	"--email-button-hover-color": "#111e30",
	"--email-button-font-size": "20px",
	"--email-button-font-weight": "300",
	"--email-button-padding-block": "16px",
	"--email-button-width": "100%",
	"--email-button-fallback-margin-block-start": "12px",
	"--email-button-margin-block-end": "24px",
	"--email-logo-height": "85.33333333333333px",
	"--email-logo-padding": "8px",
	"--email-canvas-bg": "#ffffff",
	"--email-bg": "#ffffff",
	"--email-color": "#111e30",
	"--email-muted-color": "#4a4a4a",
	"--email-border-color": "#111e30"
};
//#endregion
//#region src/stories/email/emailTheme.ts
function b(e) {
	return y[e];
}
function x(e) {
	return `${-Number.parseFloat(b(e))}px`;
}
var S = {
	canvas: b("--email-canvas-bg"),
	background: b("--email-bg"),
	text: b("--email-color"),
	muted: b("--email-muted-color"),
	border: b("--email-border-color")
}, C = b("--email-font-family"), w = b("--email-font-weight-range"), T = b("--email-max-width"), E = Number.parseFloat(b("--email-logo-height")), D = Number.parseFloat(b("--email-logo-padding")), O = {
	width: n(E) + D * 2,
	height: Math.round(E + D * 2),
	filename: t
}, k = "https://slxd.app/brand/email", A = e, j = {
	color: S.muted,
	fontFamily: C,
	fontWeight: Number(b("--email-font-weight")),
	fontSize: b("--email-note-font-size"),
	lineHeight: b("--email-note-line-height"),
	margin: 0
}, M = {
	heading: {
		color: S.text,
		fontFamily: C,
		fontSize: b("--email-heading-font-size"),
		fontWeight: Number(b("--email-heading-font-weight")),
		lineHeight: b("--email-heading-line-height"),
		margin: `0 0 ${b("--email-heading-margin-block-end")}`
	},
	text: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(b("--email-font-weight")),
		fontSize: b("--email-font-size"),
		lineHeight: b("--email-line-height"),
		margin: `0 0 ${b("--email-text-margin-block-end")}`
	},
	textEmphasis: { fontWeight: Number(b("--email-text-emphasis-font-weight")) },
	muted: j,
	footnote: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(b("--email-font-weight")),
		fontSize: b("--email-note-font-size"),
		lineHeight: b("--email-note-line-height"),
		margin: 0
	},
	button: {
		backgroundColor: b("--email-button-bg"),
		color: b("--email-button-color"),
		display: "block",
		width: b("--email-button-width"),
		textAlign: "center",
		fontFamily: C,
		fontSize: b("--email-button-font-size"),
		fontWeight: Number(b("--email-button-font-weight")),
		padding: `${b("--email-button-padding-block")} 0`,
		textDecoration: "none",
		marginBottom: b("--email-button-margin-block-end")
	},
	buttonFallback: {
		...j,
		margin: `${b("--email-button-fallback-margin-block-start")} 0 ${b("--email-button-margin-block-end")}`
	},
	buttonFallbackUrl: {
		color: S.text,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	link: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(b("--email-font-weight")),
		textDecoration: "underline"
	},
	heading2: {
		color: b("--email-heading-2-color"),
		fontFamily: C,
		fontSize: b("--email-heading-2-font-size"),
		fontWeight: Number(b("--email-heading-2-font-weight")),
		lineHeight: b("--email-heading-2-line-height"),
		margin: `${b("--email-heading-2-margin-block-start")} 0 ${b("--email-heading-2-margin-block-end")}`
	},
	list: {
		color: S.text,
		fontFamily: C,
		fontSize: b("--email-font-size"),
		fontWeight: Number(b("--email-font-weight")),
		lineHeight: b("--email-line-height"),
		margin: `0 0 ${b("--email-list-margin-block-end")}`,
		paddingLeft: b("--email-list-padding-inline-start")
	},
	listItem: { margin: `0 0 ${b("--email-list-item-margin-block-end")}` },
	quote: {
		borderLeft: `${b("--email-quote-border-width")} solid ${b("--email-quote-border-color")}`,
		margin: `0 0 ${b("--email-quote-margin-block-end")}`,
		paddingLeft: b("--email-quote-padding-inline-start")
	},
	tag: {
		borderRadius: b("--email-tag-border-radius"),
		display: "inline-block",
		fontFamily: C,
		fontSize: b("--email-tag-font-size"),
		fontWeight: Number(b("--email-tag-font-weight")),
		padding: `${b("--email-tag-padding-block")} ${b("--email-tag-padding-inline")}`
	},
	divider: {
		border: 0,
		borderTop: `${b("--email-divider-width")} solid ${b("--email-divider-color")}`,
		margin: `${b("--email-divider-margin-block")} 0`,
		width: "100%"
	}
}, N = {
	success: {
		backgroundColor: b("--email-tone-success-bg"),
		color: b("--email-tone-success-color")
	},
	warning: {
		backgroundColor: b("--email-tone-warning-bg"),
		color: b("--email-tone-warning-color")
	},
	error: {
		backgroundColor: b("--email-tone-error-bg"),
		color: b("--email-tone-error-color")
	}
}, P = "email-button", F = `
  a:hover { text-decoration: none !important; }
  a.${P}:hover {
    background-color: ${b("--email-button-hover-bg")} !important;
    color: ${b("--email-button-hover-color")} !important;
  }
`;
//#endregion
//#region src/stories/email/EmailLayout.tsx
function I(e) {
	if (e.reasonLabel !== void 0) return /* @__PURE__ */ a(v, {
		style: M.footnote,
		children: [
			e.reasonLabel,
			" ",
			/* @__PURE__ */ i(h, {
				href: e.unsubscribeUrl,
				style: M.link,
				children: e.unsubscribeLabel
			})
		]
	});
	let { unsubscribeUrl: t, preferencesUrl: n, manageLabel: r = "Para dejar de recibir estos avisos,", unsubscribeLabel: o = n ? "Darse de baja" : "date de baja", manageBeforeLabel: s = " o ", managePreferencesLabel: c = "gestiona tus preferencias", manageAfterLabel: l = "." } = e, u = /* @__PURE__ */ i(h, {
		href: t,
		style: M.link,
		children: o
	});
	return n ? /* @__PURE__ */ a(v, {
		style: M.footnote,
		children: [
			u,
			s,
			/* @__PURE__ */ i(h, {
				href: n,
				style: M.link,
				children: c
			}),
			l
		]
	}) : /* @__PURE__ */ a(v, {
		style: M.footnote,
		children: [
			r,
			" ",
			u
		]
	});
}
function L({ preview: e, appName: t, locale: n = "es", assetsBaseUrl: r = k, logoAlt: s, optOut: d, children: f }) {
	let h = r.replace(/\/$/, "");
	return /* @__PURE__ */ a(p, {
		lang: n,
		children: [
			/* @__PURE__ */ a(u, { children: [/* @__PURE__ */ i(l, {
				fontFamily: "Google Sans Flex",
				fallbackFontFamily: "sans-serif",
				webFont: {
					url: `${h}/${A}`,
					format: "woff2"
				},
				fontWeight: w,
				fontStyle: "normal"
			}), /* @__PURE__ */ i("style", { dangerouslySetInnerHTML: { __html: F } })] }),
			/* @__PURE__ */ i(g, { children: e }),
			/* @__PURE__ */ i(o, {
				style: {
					backgroundColor: S.canvas,
					color: S.text,
					fontFamily: M.text.fontFamily,
					fontSize: M.text.fontSize,
					fontWeight: M.text.fontWeight,
					lineHeight: M.text.lineHeight,
					margin: 0,
					padding: 0
				},
				children: /* @__PURE__ */ a(_, {
					style: {
						backgroundColor: S.canvas,
						padding: `${b("--email-canvas-padding-block")} ${b("--email-canvas-padding-inline")}`,
						width: "100%"
					},
					children: [
						/* @__PURE__ */ i(c, {
							style: {
								backgroundColor: S.background,
								margin: "0 auto",
								maxWidth: T,
								padding: 0
							},
							children: /* @__PURE__ */ i(m, {
								src: `${h}/${O.filename}`,
								alt: s ?? t,
								width: O.width,
								height: O.height,
								style: {
									border: 0,
									display: "block",
									marginBottom: b("--email-brand-padding-block"),
									marginLeft: x("--email-brand-padding-inline")
								}
							})
						}),
						/* @__PURE__ */ i(c, {
							style: {
								backgroundColor: S.background,
								border: `${b("--email-border-width")} solid ${S.border}`,
								borderRadius: 0,
								margin: "0 auto",
								maxWidth: T,
								padding: `${b("--email-padding-block")} ${b("--email-padding-inline")}`
							},
							children: /* @__PURE__ */ i(_, { children: f })
						}),
						d && /* @__PURE__ */ i(c, {
							style: {
								backgroundColor: S.canvas,
								margin: "0 auto",
								maxWidth: T,
								padding: `${b("--email-opt-out-margin-block-start")} 0 0`
							},
							children: /* @__PURE__ */ i(I, { ...d })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/email/EmailPrimitives.tsx
function R({ children: e, level: t = 1, style: n }) {
	let r = t === 1 ? M.heading : M.heading2;
	return /* @__PURE__ */ i(d, {
		as: `h${t}`,
		style: {
			...r,
			...n
		},
		children: e
	});
}
function z({ children: e, emphasis: t = !1, style: n }) {
	return /* @__PURE__ */ i(v, {
		style: {
			...M.text,
			...t && M.textEmphasis,
			...n
		},
		children: e
	});
}
function B({ children: e, ordered: t = !1, style: n }) {
	return /* @__PURE__ */ i(t ? "ol" : "ul", {
		style: {
			...M.list,
			...n
		},
		children: e
	});
}
function V({ children: e, style: t }) {
	return /* @__PURE__ */ i("li", {
		style: {
			...M.listItem,
			...t
		},
		children: e
	});
}
function H({ children: e, style: t }) {
	return /* @__PURE__ */ i(_, {
		style: {
			...M.quote,
			...t
		},
		children: e
	});
}
function U({ children: e, tone: t, style: n }) {
	return /* @__PURE__ */ i("span", {
		style: {
			...M.tag,
			...N[t],
			...n
		},
		children: e
	});
}
function W({ style: e }) {
	return /* @__PURE__ */ i(f, { style: {
		...M.divider,
		...e
	} });
}
function G({ children: e, tone: t = "muted", style: n }) {
	return /* @__PURE__ */ i(v, {
		style: {
			...t === "muted" ? M.muted : M.footnote,
			...n
		},
		children: e
	});
}
function K({ href: e, children: t, style: n }) {
	return /* @__PURE__ */ i(h, {
		href: e,
		style: {
			...M.link,
			...n
		},
		children: t
	});
}
function q({ href: e, children: t, fallbackLabel: n, style: o }) {
	return /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(s, {
		href: e,
		className: P,
		style: {
			...M.button,
			marginBottom: 0,
			...o
		},
		children: t
	}), /* @__PURE__ */ a(v, {
		style: M.buttonFallback,
		children: [
			n,
			/* @__PURE__ */ i("br", {}),
			/* @__PURE__ */ i("span", {
				style: M.buttonFallbackUrl,
				children: e
			})
		]
	})] });
}
//#endregion
export { q as EmailButton, W as EmailDivider, R as EmailHeading, L as EmailLayout, K as EmailLink, B as EmailList, V as EmailListItem, G as EmailNote, H as EmailQuote, U as EmailTag, z as EmailText, k as emailAssetsBaseUrl, C as emailFontFamily, A as emailFontFilename, O as emailLogo, T as emailMaxWidth, S as emailPalette, F as emailStyleSheet, M as emailStyles, N as emailTones };

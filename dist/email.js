import { EMAIL_FONT_FILENAME as e, EMAIL_LOGO_FILENAME as t } from "./brand-assets.js";
import { Body as n, Button as r, Container as i, Font as a, Head as o, Heading as s, Hr as c, Html as l, Img as u, Link as d, Preview as f, Section as p, Text as m } from "react-email";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
//#region src/stories/email/emailTokens.ts
var v = {
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
	"--email-logo-mark-size": "48px",
	"--email-logo-padding": "8px",
	"--email-canvas-bg": "#ffffff",
	"--email-bg": "#ffffff",
	"--email-color": "#111e30",
	"--email-muted-color": "#4a4a4a",
	"--email-border-color": "#111e30"
};
//#endregion
//#region src/stories/email/emailTheme.ts
function y(e) {
	return v[e];
}
var b = {
	canvas: y("--email-canvas-bg"),
	background: y("--email-bg"),
	text: y("--email-color"),
	muted: y("--email-muted-color"),
	border: y("--email-border-color")
}, x = y("--email-font-family"), S = y("--email-font-weight-range"), C = y("--email-max-width"), w = {
	size: Number.parseFloat(y("--email-logo-mark-size")) + Number.parseFloat(y("--email-logo-padding")) * 2,
	filename: t
}, T = "https://slxd.app/brand/email", E = e, D = {
	color: b.muted,
	fontFamily: x,
	fontWeight: Number(y("--email-font-weight")),
	fontSize: y("--email-note-font-size"),
	lineHeight: y("--email-note-line-height"),
	margin: 0
}, O = {
	heading: {
		color: b.text,
		fontFamily: x,
		fontSize: y("--email-heading-font-size"),
		fontWeight: Number(y("--email-heading-font-weight")),
		lineHeight: y("--email-heading-line-height"),
		margin: `0 0 ${y("--email-heading-margin-block-end")}`
	},
	text: {
		color: b.text,
		fontFamily: x,
		fontWeight: Number(y("--email-font-weight")),
		fontSize: y("--email-font-size"),
		lineHeight: y("--email-line-height"),
		margin: `0 0 ${y("--email-text-margin-block-end")}`
	},
	textEmphasis: { fontWeight: Number(y("--email-text-emphasis-font-weight")) },
	muted: D,
	footnote: {
		color: b.text,
		fontFamily: x,
		fontWeight: Number(y("--email-font-weight")),
		fontSize: y("--email-note-font-size"),
		lineHeight: y("--email-note-line-height"),
		margin: 0
	},
	button: {
		backgroundColor: y("--email-button-bg"),
		color: y("--email-button-color"),
		display: "block",
		width: y("--email-button-width"),
		textAlign: "center",
		fontFamily: x,
		fontSize: y("--email-button-font-size"),
		fontWeight: Number(y("--email-button-font-weight")),
		padding: `${y("--email-button-padding-block")} 0`,
		textDecoration: "none",
		marginBottom: y("--email-button-margin-block-end")
	},
	buttonFallback: {
		...D,
		margin: `${y("--email-button-fallback-margin-block-start")} 0 ${y("--email-button-margin-block-end")}`
	},
	buttonFallbackUrl: {
		color: b.text,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	link: {
		color: b.text,
		fontFamily: x,
		fontWeight: Number(y("--email-font-weight")),
		textDecoration: "underline"
	},
	heading2: {
		color: y("--email-heading-2-color"),
		fontFamily: x,
		fontSize: y("--email-heading-2-font-size"),
		fontWeight: Number(y("--email-heading-2-font-weight")),
		lineHeight: y("--email-heading-2-line-height"),
		margin: `${y("--email-heading-2-margin-block-start")} 0 ${y("--email-heading-2-margin-block-end")}`
	},
	list: {
		color: b.text,
		fontFamily: x,
		fontSize: y("--email-font-size"),
		fontWeight: Number(y("--email-font-weight")),
		lineHeight: y("--email-line-height"),
		margin: `0 0 ${y("--email-list-margin-block-end")}`,
		paddingLeft: y("--email-list-padding-inline-start")
	},
	listItem: { margin: `0 0 ${y("--email-list-item-margin-block-end")}` },
	quote: {
		borderLeft: `${y("--email-quote-border-width")} solid ${y("--email-quote-border-color")}`,
		margin: `0 0 ${y("--email-quote-margin-block-end")}`,
		paddingLeft: y("--email-quote-padding-inline-start")
	},
	tag: {
		borderRadius: y("--email-tag-border-radius"),
		display: "inline-block",
		fontFamily: x,
		fontSize: y("--email-tag-font-size"),
		fontWeight: Number(y("--email-tag-font-weight")),
		padding: `${y("--email-tag-padding-block")} ${y("--email-tag-padding-inline")}`
	},
	divider: {
		border: 0,
		borderTop: `${y("--email-divider-width")} solid ${y("--email-divider-color")}`,
		margin: `${y("--email-divider-margin-block")} 0`,
		width: "100%"
	}
}, k = {
	success: {
		backgroundColor: y("--email-tone-success-bg"),
		color: y("--email-tone-success-color")
	},
	warning: {
		backgroundColor: y("--email-tone-warning-bg"),
		color: y("--email-tone-warning-color")
	},
	error: {
		backgroundColor: y("--email-tone-error-bg"),
		color: y("--email-tone-error-color")
	}
}, A = "email-button", j = `
  a:hover { text-decoration: none !important; }
  a.${A}:hover {
    background-color: ${y("--email-button-hover-bg")} !important;
    color: ${y("--email-button-hover-color")} !important;
  }
`;
//#endregion
//#region src/stories/email/EmailLayout.tsx
function M(e) {
	if (e.reasonLabel !== void 0) return /* @__PURE__ */ _(m, {
		style: O.footnote,
		children: [
			e.reasonLabel,
			" ",
			/* @__PURE__ */ g(d, {
				href: e.unsubscribeUrl,
				style: O.link,
				children: e.unsubscribeLabel
			})
		]
	});
	let { unsubscribeUrl: t, preferencesUrl: n, manageLabel: r = "Para dejar de recibir estos avisos,", unsubscribeLabel: i = n ? "Darse de baja" : "date de baja", manageBeforeLabel: a = " o ", managePreferencesLabel: o = "gestiona tus preferencias", manageAfterLabel: s = "." } = e, c = /* @__PURE__ */ g(d, {
		href: t,
		style: O.link,
		children: i
	});
	return n ? /* @__PURE__ */ _(m, {
		style: O.footnote,
		children: [
			c,
			a,
			/* @__PURE__ */ g(d, {
				href: n,
				style: O.link,
				children: o
			}),
			s
		]
	}) : /* @__PURE__ */ _(m, {
		style: O.footnote,
		children: [
			r,
			" ",
			c
		]
	});
}
function N({ preview: e, appName: t, locale: r = "es", assetsBaseUrl: s = T, logoAlt: c, optOut: d, children: m }) {
	let h = s.replace(/\/$/, "");
	return /* @__PURE__ */ _(l, {
		lang: r,
		children: [
			/* @__PURE__ */ _(o, { children: [/* @__PURE__ */ g(a, {
				fontFamily: "Google Sans Flex",
				fallbackFontFamily: "sans-serif",
				webFont: {
					url: `${h}/${E}`,
					format: "woff2"
				},
				fontWeight: S,
				fontStyle: "normal"
			}), /* @__PURE__ */ g("style", { dangerouslySetInnerHTML: { __html: j } })] }),
			/* @__PURE__ */ g(f, { children: e }),
			/* @__PURE__ */ g(n, {
				style: {
					backgroundColor: b.canvas,
					color: b.text,
					fontFamily: O.text.fontFamily,
					fontSize: O.text.fontSize,
					fontWeight: O.text.fontWeight,
					lineHeight: O.text.lineHeight,
					margin: 0,
					padding: 0
				},
				children: /* @__PURE__ */ _(p, {
					style: {
						backgroundColor: b.canvas,
						padding: `${y("--email-canvas-padding-block")} ${y("--email-canvas-padding-inline")}`,
						width: "100%"
					},
					children: [
						/* @__PURE__ */ g(i, {
							style: {
								backgroundColor: b.background,
								margin: "0 auto",
								maxWidth: C,
								padding: `${y("--email-brand-padding-block")} ${y("--email-brand-padding-inline")}`
							},
							children: /* @__PURE__ */ g(u, {
								src: `${h}/${w.filename}`,
								alt: c ?? t,
								width: w.size,
								height: w.size,
								style: {
									border: 0,
									display: "block"
								}
							})
						}),
						/* @__PURE__ */ g(i, {
							style: {
								backgroundColor: b.background,
								border: `${y("--email-border-width")} solid ${b.border}`,
								borderRadius: 0,
								margin: "0 auto",
								maxWidth: C,
								padding: `${y("--email-padding-block")} ${y("--email-padding-inline")}`
							},
							children: /* @__PURE__ */ g(p, { children: m })
						}),
						d && /* @__PURE__ */ g(i, {
							style: {
								backgroundColor: b.canvas,
								margin: "0 auto",
								maxWidth: C,
								padding: `${y("--email-opt-out-margin-block-start")} 0 0`
							},
							children: /* @__PURE__ */ g(M, { ...d })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/email/EmailPrimitives.tsx
function P({ children: e, level: t = 1, style: n }) {
	let r = t === 1 ? O.heading : O.heading2;
	return /* @__PURE__ */ g(s, {
		as: `h${t}`,
		style: {
			...r,
			...n
		},
		children: e
	});
}
function F({ children: e, emphasis: t = !1, style: n }) {
	return /* @__PURE__ */ g(m, {
		style: {
			...O.text,
			...t && O.textEmphasis,
			...n
		},
		children: e
	});
}
function I({ children: e, ordered: t = !1, style: n }) {
	return /* @__PURE__ */ g(t ? "ol" : "ul", {
		style: {
			...O.list,
			...n
		},
		children: e
	});
}
function L({ children: e, style: t }) {
	return /* @__PURE__ */ g("li", {
		style: {
			...O.listItem,
			...t
		},
		children: e
	});
}
function R({ children: e, style: t }) {
	return /* @__PURE__ */ g(p, {
		style: {
			...O.quote,
			...t
		},
		children: e
	});
}
function z({ children: e, tone: t, style: n }) {
	return /* @__PURE__ */ g("span", {
		style: {
			...O.tag,
			...k[t],
			...n
		},
		children: e
	});
}
function B({ style: e }) {
	return /* @__PURE__ */ g(c, { style: {
		...O.divider,
		...e
	} });
}
function V({ children: e, tone: t = "muted", style: n }) {
	return /* @__PURE__ */ g(m, {
		style: {
			...t === "muted" ? O.muted : O.footnote,
			...n
		},
		children: e
	});
}
function H({ href: e, children: t, style: n }) {
	return /* @__PURE__ */ g(d, {
		href: e,
		style: {
			...O.link,
			...n
		},
		children: t
	});
}
function U({ href: e, children: t, fallbackLabel: n, style: i }) {
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(r, {
		href: e,
		className: A,
		style: {
			...O.button,
			marginBottom: 0,
			...i
		},
		children: t
	}), /* @__PURE__ */ _(m, {
		style: O.buttonFallback,
		children: [
			n,
			/* @__PURE__ */ g("br", {}),
			/* @__PURE__ */ g("span", {
				style: O.buttonFallbackUrl,
				children: e
			})
		]
	})] });
}
//#endregion
export { U as EmailButton, B as EmailDivider, P as EmailHeading, N as EmailLayout, H as EmailLink, I as EmailList, L as EmailListItem, V as EmailNote, R as EmailQuote, z as EmailTag, F as EmailText, T as emailAssetsBaseUrl, x as emailFontFamily, E as emailFontFilename, w as emailLogo, C as emailMaxWidth, b as emailPalette, j as emailStyleSheet, O as emailStyles, k as emailTones };

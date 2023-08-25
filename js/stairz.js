export {
	$, $$, $head, $body, $create,
	createDataResource,
	dl,
	extendProto,
	loadScript,
	onOrIfDomContentLoaded,
	subst,
	writeToClipboard,
}

const _extendProto = ({ prototype: proto }, source) => {
	Object.entries(source).forEach(([key, value]) => {
		if (proto[key] === value)
			return
		if (Object.hasOwn(proto, key))
			console.warn(`Overriding ${proto.constructor.name}.prototype.${key}!`)
		Object.defineProperty(proto, key, { value, enumerable: false })
	})
}

const _protoArray = {
	eq(arr) {
		if (!Array.isArray(arr))
			throw new TypeError("arg must be of type array")
		if (this.length !== arr.length)
			return false
		for (let i = 0, l = this.length; i < l; i++)
			if (this[i] !== arr[i])
				return false
		return true
	},
	neg(i) {
		return this[this.length - i]
	},
	rand() {
		return this[Math.floor(Math.random() * this.length)]
	},
	remove(i) {
		const [removed] = this.splice(i, 1)
		return removed
	},
	uniq() {
		return [...new Set(this)]
	},
}

const _protoElement = {
	$: Element.prototype.querySelector,
	$$(sel) {
		return [...this.querySelectorAll(sel)]
	},
	appendAfter($el) {
		// https://stackoverflow.com/a/5192810/9281985
		$el.parentNode.insertBefore(this, $el.nextSibling)
		return this
	},
	appendBefore($el) {
		$el.parentNode.insertBefore(this, $el)
		return this
	},
	appendTo($el) {
		$el.append(this)
		return this
	},
	css(props) {
		Object.assign(this.style, props)
		return this
	},
	fade(cb, dur = 500) {
		const { opacity, transition } = this.style
		this.css({
			transition: `opacity ${dur}ms`,
			opacity: 0,
		})
		setTimeout(() => {
			cb()
			this.css({ opacity })
			setTimeout(() => this.css({ transition }), dur)
		}, dur)
		return this
	},
}

const $ = document.querySelector.bind(document)
const $$ = (sel) => [...document.querySelectorAll(sel)]
const $head = document.head || document
const $body = document.body || document
const $create = (tag, ...props) => {
	const $el = document.createElement(tag)
	return Object.assign($el, ...props)
}

const createDataResource = (contentType, val) => {
	return `data:${contentType},${encodeURIComponent(val)}`
}

const dl = (url, download = "unnamed") => {
	$create("a", { href: url, download }).click()
}

const extendProto = {
	"Array": () => _extendProto(Array, _protoArray),
	"Element": () => _extendProto(Element, _protoElement),
}

const loadScript = (src) => {
	const $script = $create("script", { src })
	$body.append($script)
	$script.remove()
}

const subst = (str, substs) => {
	for (const [key, val] of Object.entries(substs))
		str = str.replace("${" + key + "}", val)
	return str
}

const writeToClipboard = (value) => {
	const $tmp = $create("textarea", { value })
	$body.append($tmp)
	$tmp.select()
	document.execCommand("copy")
	$tmp.remove()
}

console.debug("Hello there, world!!!")
console.debug("Loaded stairz.js!")

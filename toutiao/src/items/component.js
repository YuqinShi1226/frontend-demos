/**
 * @file All template file base class
 * @author Yuqin
 */

export default class Component {
	constructor (props) {
		this.props = props
	}

	render () {
		return `<div>I'm base component</div>`
	}

	constructElement () {
		const html = this.render()
    const $content = document.createElement('div')
		$content.innerHTML = html
		this.el = $content
		return $content 
	}
}
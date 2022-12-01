import React from 'react';
import withClickOutside from '../../common/withClickOutside';
import { ReactComponent as ArrowDown } from './downArrow.svg';
import { ReactComponent as ArrowUp } from './upArrow.svg';
import Dropdown from './CurrencySwitcherDrodown'
import { Currency } from '../../common/types'

 

const DropdownClickOutside = withClickOutside(Dropdown);

class CurrencySwitcher extends React.Component {
     ref = React.createRef()
	
	constructor(props) {
		super(props)
		this.state = {
			showDropdown: false,
			currencyIndex: props.currencyIndex ?? 0
		}
		this.onClickOutsideDropdown = this.onClickOutsideDropdown.bind(this)
		this.toggle = this.toggle.bind(this)
		this.changeCurrency = this.changeCurrency.bind(this)
	}

	changeCurrency(index) {
		this.props.onChange?.(index)
		this.setState({
			currencyIndex: index,
			showDropdown: false
		})
	}

	toggle = () => this.setState({ showDropdown: !this.state.showDropdown })

	onClickOutsideDropdown(e) {
		this.setState({ showDropdown: false })
		// open cart and close overlay in one click
		if (this.ref.current?.contains(e.target)) {
			e.stopImmediatePropagation();
		}
	}

	render = () => (
		<div className='currencySwitcher'>
			<button
				ref={this.ref}
				onClick={this.toggle}
			>
				<div className='currency'>{this.props.currencies[this.state.currencyIndex]?.symbol ?? '$'}</div>
				{this.state.showDropdown ? <ArrowUp className='arrow'/> : <ArrowDown className='arrow'/>}
			</button>
			{this.state.showDropdown &&
				<DropdownClickOutside
					currencies={this.props.currencies}
					changeCurrency={this.changeCurrency}
					onClickOutside={this.onClickOutsideDropdown}
				/>
			}
		</div>
	)
}

export default CurrencySwitcher;
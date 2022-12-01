import React from 'react'




class CartGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {index: 0}
    }

    render = () => (
        <>
            {this.props.showPreviews && <div className='productImagePreviews'>
                {this.props.gallery.map((i, index) =>
                    <img
                        key={i}
                        src={i}
                        alt={this.props.name + index}
                        onClick={() => this.setState({index})}
                    />
                )}
            </div>}
            <div className='mainImageContainer'>
                <img
                    src={this.props.gallery[this.state.index]}
                    className='productImage'
                    alt={this.props.name + " current"}
                />
                {this.state.index > 0 && <button
                    className='prev'
                    onClick={() => this.setState({index: this.state.index > 0 ? this.state.index - 1 : 0})}
                >
                    {`<`}
                </button>}
                {this.state.index < this.props.gallery.length - 1 && <button
                    className='next'
                    onClick={() =>
                        this.setState({
                            index:
                                this.state.index + 1 < this.props.gallery.length ?
                                    this.state.index + 1 :
                                    this.props.gallery.length - 1
                        })}
                >
                    {`>`}
                </button>}
            </div>
        </>
    )
}

export default CartGallery
import React from 'react';

class AttributeItem extends React.Component{
    render(){
        const typeProps = this.props.type === 'swatch' ? { style: {backgroundColor: this.props.value} }
            : { children: this.props.value }
        const props={
            className: this.props.type+(this.props.selected ? ' selected' : ''),
             ...typeProps
        }
        return(
            <div {...props}/>

        )
    }

}
export default AttributeItem
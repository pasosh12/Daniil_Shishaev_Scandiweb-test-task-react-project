import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


export const productClick = graphql(gql`
   query ClickProduct($id: String!){
      product(id: $id){
         id
         name
         inStock
         gallery
         description
         category
         prices {
         currency {
            label
            symbol
         }
         amount
         }
         brand
         attributes {
         name
         id
         items {
            displayValue
            value
            id
         }
         }
      }
   }
`, {
        options: (props) => ({
            variables: {
                id: props.idProduct ? props.idProduct : props.openModalProductAddBusket
            }
        })
    },
)
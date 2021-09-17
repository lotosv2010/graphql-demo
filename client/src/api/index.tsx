import {gql} from 'apollo-boost';
export const CATEGORIES_PRODUCTS = gql`query{
  getCategories {
    id
    name
    products {
      id
      name
    }
  }
  getProducts {
    id
    name
    category {
      id
      name
      products {
        id
        name
      }
    }
  }
}
`;

export const ADD_PRODUCT = gql`
mutation($name:String!, $categoryId: String!){
  addProduct(name: $name, category: $categoryId) {
    id
    name
    category {
      id
      name
    }
  }
}
`;

export const DELETE_PRODUCT = gql`
mutation($id:String!){
  deleteProduct(_id: $id) {
    id
    name
    category {
      id
      name
    }
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation($id:String!, $name:String!, $category: String!){
  updateProduct(_id: $id, name: $name, category: $category) {
    id
    name
    category {
      id
      name
    }
  }
}
`;


export const PRODUCTS = gql`query{
  getProducts {
    id
    name
    category {
      id
      name
      products {
        id
        name
      }
    }
  }
}
`;
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const categories = [
  {id: '1', name: '图书'},
  {id: '2', name: '数码'},
  {id: '3', name: '食品'}
];

const products = [
  {id: '1', name: '红楼梦', category: '1'},
  {id: '2', name: '水浒传', category: '1'},
  {id: '3', name: '三国演义', category: '1'},
  {id: '4', name: '西游记', category: '1'},
  {id: '5', name: 'iphone', category: '2'},
  {id: '6', name: '面包', category: '3'},
  {id: '7', name: '蛋糕', category: '3'}
];

// ! 1.定义产品类别类型
const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    products: {
      type: new GraphQLList(Product),
      resolve(parent) {
        return products.filter(item => item.category === parent.id);
      }
    }
  })
});
const Product = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    category: { // 字符串转成对象, 1 => {name: '图书'}
      type: Category,
      resolve(parent) {
        return categories.find(item => item.id === parent.category);
      }
    }
  })
});

// ! 2.定义根类型 query mutation
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getCategory: { // 根据分类id查询单个分类
      type: Category,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return categories.find(item => item.id === args.id);
      }
    },
    getCategories: { // 查询所有的分类
      type: new GraphQLList(Category),
      args: {},
      resolve(parent, args) {
        return categories;
      }
    },
    getProduct: { // 根据商品id获取单个商品
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return products.find(item => item.id === args.id);
      }
    },
    getProducts: { // 查询所有的产品
      type: new GraphQLList(Product),
      args: {},
      resolve(parent, args) {
        return products;
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addCategory: {
      type: Category,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        args.id = categories.length + 1,
        categories.push(args);
        return args;
      }
    },
    addProduct: {
      type: Product,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: {type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        args.id = products.length + 1,
        products.push(args);
        return args;
      }
    }
  }
});

// ! 3.定义 schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
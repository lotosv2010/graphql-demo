const graphql = require('graphql');
const {CategoryModel, ProductModel} = require('./model');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// ! 1.定义产品类别类型
const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    products: {
      type: new GraphQLList(Product),
      resolve(parent) {
        return ProductModel.find({category: parent.id});
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
        return CategoryModel.findById(parent.category);
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
        return CategoryModel.findById(args.id);
      }
    },
    getCategories: { // 查询所有的分类
      type: new GraphQLList(Category),
      args: {},
      resolve(parent, args) {
        return CategoryModel.find();
      }
    },
    getProduct: { // 根据商品id获取单个商品
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return ProductModel.findById(args.id);
      }
    },
    getProducts: { // 查询所有的产品
      type: new GraphQLList(Product),
      args: {},
      resolve(parent, args) {
        return ProductModel.find()
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
        return CategoryModel.create(args);
      }
    },
    addProduct: {
      type: Product,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: {type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return ProductModel.create(args);
      }
    },
    deleteProduct: {
      type: Product,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return ProductModel.deleteOne(args);
      }
    },
    updateProduct: {
      type: Product,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: {type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const {name, category, _id} = args;
        const whereStr = {_id: _id};  // 查询条件
        const updateStr = {$set: {name, category}};
        return ProductModel.updateOne(whereStr, updateStr);
      }
    }
  }
});

// ! 3.定义 schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
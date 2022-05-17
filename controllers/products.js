const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing async errors')
    // const products = await Product.find({}).sort('-name price')

    const products = await Product.find({})
        .sort('name')
        .select('name price')
        .limit(10)
        .skip(5)

    res.status(200).json({ products, nbHits: products.length })

    // const products = await Product.find({
    //     //mongodb query and projection operators, i(option) is for case insensitivity
    //     name: {$regex: search, $options: 'i'}
    // })
    
    // res.status(200).json({msg: 'products testing route'})
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {}

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = {$regex: name, $options: 'i'};
    } 

    // console.log(queryObject)
 
    let result = Product.find(queryObject)
    //sort
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if(fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    // Pagination setup
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) *  limit;

    result = result.skip(skip).limit(limit)

    const products = await result;

     res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}
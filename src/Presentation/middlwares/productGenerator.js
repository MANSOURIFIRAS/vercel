const exelJS = require('exceljs');
const ratingRepository = require('../../Domain/IRepositories/RatingRepository.js');
const productRepository = require('../../Domain/IRepositories/ProductRepository.js');
const downloadResource = require('./utils.js');
var { Parser } = require('json2csv')



const exportProducts = async (req , res) => {
    try{
        const workbook = new exelJS.Workbook();
        const worksheet = workbook.addWorksheet('Products');
        worksheet.columns = [
            {header: 'productId,title,genres', key: 'id', width: 10},
        ];
        const products = await productRepository.getAll();
        products.forEach((product) => {
            var insertion = product._id+","+ product.name+","+  product.categorie;
            worksheet.addRow({
                id: insertion
            });
        }
        );
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'products.xlsx');
        return workbook.xlsx.write(res)
        .then(function(){
            res.status(200).end();
        }
        );
    } catch(error){
        console.error(error);
        throw new Error('Could not export products');
    }
}
const download = async (req, res) => {
    const fields = [{
        label: 'productId',
        value: '_id'
    }, {
        label: 'title',
        value: 'name'
    }, {
        label: 'genres',
        value: 'categorie'
    }
]

    const json2csv = new Parser({ fields: fields })
    const products = await productRepository.getAll();
    const jsonproducts =JSON.parse(JSON.stringify(products));
    console.log(jsonproducts);
    try {
        const csv = json2csv.parse(jsonproducts)
        res.attachment('products.csv')
        res.status(200).send(csv)
    } catch (error) {
        console.log('error:', error.message)
        res.status(500).send(error.message)
    }
   }
module.exports = download;

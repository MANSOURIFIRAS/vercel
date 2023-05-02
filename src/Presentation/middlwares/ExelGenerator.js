/*{header: 'userId,productId,rating,timestamp', key: 'id', width: 10},
var insertion = rating.user+","+ rating.product+","+  rating.ratingValue.toPrecision(2) +","+ rating.createdAt.getMinutes();
*/
const exelJS = require('exceljs');
const ratingRepository = require('../../Domain/IRepositories/RatingRepository.js');
const productRepository = require('../../Domain/IRepositories/ProductRepository.js');
const downloadResource = require('./utils.js');
var { Parser } = require('json2csv')



const exportProducts = async (req , res) => {
    try{
        const workbook = new exelJS.Workbook();
        const worksheet = workbook.addWorksheet('Ratings');
        worksheet.columns = [
            {header: 'userId,productId,rating,timestamp', key: 'id', width: 10},
        ];
        const ratings = await ratingRepository.getAll();
        ratings.forEach((rating) => {
            var insertion = rating.user+","+ rating.product+","+  rating.ratingValue.toPrecision(2) +","+ rating.createdAt.getMinutes();
            worksheet.addRow({
                id: insertion
            });
        }
        );
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'ratings.xlsx');
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
        label: 'userId',
        value: 'user'
    }, {
        label: 'productId',
        value: 'product'
    }, {
        label: 'rating',
        value: 'ratingValue'
    },
    {
        label: 'timestamp',
        value: 'createdAt'
    }
]

    const json2csv = new Parser({ fields: fields })
    const ratings = await ratingRepository.getAll();
    const jsonratings =JSON.parse(JSON.stringify(ratings));
    console.log(jsonratings);
    try {
        const csv = json2csv.parse(jsonratings)
        res.attachment('ratings.csv')
        res.status(200).send(csv)
    } catch (error) {
        console.log('error:', error.message)
        res.status(500).send(error.message)
    }
   }
module.exports = download;

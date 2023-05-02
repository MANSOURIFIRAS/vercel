class Product {
    constructor({ name, description , unitPrice,pic,quantityWeight,id,rating,categorie,user}) {
      this.name = name;
      this.description = description;
      this.unitPrice = unitPrice;
      this.pic = pic;
      this.quantityWeight = quantityWeight;
      this.id = id;
      this.rating = rating;
      this.categorie = categorie;
      this.user = user;
    }
  }
  
  module.exports = Product;
  
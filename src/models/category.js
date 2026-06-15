const { v4: uuidv4 } = require("uuid");

class Category {
  constructor(name, description) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;

    this.parentId = null;
    this.subCategoryIds = [];
    this.productIds = [];

    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }
}

module.exports = Category;

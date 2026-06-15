const db = require("../database");
const Category = require("../models/Category");

class CategoryService {

  create(name, description) {
    const category = new Category(name, description);
    db.categories.set(category.id, category);
    return category;
  }

  update(id, data) {
    const category = db.categories.get(id);
    if (!category) throw new Error("Category not found");

    if (data.name) category.name = data.name;
    if (data.description) category.description = data.description;

    category.updatedAt = new Date();
    return category;
  }

  delete(id) {
    const category = db.categories.get(id);
    if (!category) return;

    // detach from parent
    if (category.parentId) {
      const parent = db.categories.get(category.parentId);
      if (parent) {
        parent.subCategoryIds = parent.subCategoryIds.filter(c => c !== id);
      }
    }

    // recursive delete
    for (const childId of [...category.subCategoryIds]) {
      this.delete(childId);
    }

    db.categories.delete(id);
  }

  addSubCategory(parentId, childId) {
    const parent = db.categories.get(parentId);
    const child = db.categories.get(childId);

    if (!parent || !child) throw new Error("Category not found");

    // prevent cycle
    if (this._isCircular(childId, parentId)) {
      throw new Error("Circular dependency detected");
    }

    parent.subCategoryIds.push(childId);
    child.parentId = parentId;
  }

  _isCircular(startId, targetId) {
    let current = db.categories.get(startId);

    while (current) {
      if (current.id === targetId) return true;
      current = db.categories.get(current.parentId);
    }
    return false;
  }

  addProduct(categoryId, productId) {
    const category = db.categories.get(categoryId);
    const product = db.products.get(productId);

    if (!category || !product) throw new Error("Not found");

    if (!category.productIds.includes(productId)) {
      category.productIds.push(productId);
    }
  }

  removeProduct(categoryId, productId) {
    const category = db.categories.get(categoryId);
    if (!category) return;

    category.productIds = category.productIds.filter(p => p !== productId);
  }
}

module.exports = new CategoryService();

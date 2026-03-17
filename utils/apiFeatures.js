class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // Mongoose query (e.g. Tour.find())
    this.queryString = queryString; // req.query
  }

  // 1️⃣ FILTERING
  filter() {
    // Make a shallow copy to avoid mutation
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Convert to string for regex-based operator replacement
    let queryStr = JSON.stringify(queryObj);

    // Replace operators (gte, gt, lte, lt) → $gte, $gt, etc.
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Parse back to object
    const mongoQuery = JSON.parse(queryStr);

    // Convert numeric strings → Numbers (e.g., "1000" → 1000)
    const convertNumbers = (obj) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          convertNumbers(obj[key]);
          // eslint-disable-next-line no-restricted-globals
        } else if (!isNaN(obj[key])) {
          obj[key] = Number(obj[key]);
        }
      }
    };
    convertNumbers(mongoQuery);

    // Debug log
    console.log('Mongo Filter Query:', mongoQuery);

    this.query = this.query.find(mongoQuery);
    return this;
  }

  // 2️⃣ SORTING
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // 3️⃣ FIELD LIMITING
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // 4️⃣ PAGINATION
  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;

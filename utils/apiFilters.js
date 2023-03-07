class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
}

module.exports = APIFilters;

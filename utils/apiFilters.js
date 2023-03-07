class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    this.query = this.query.find(this.queryString);
    return this;
  }
}

module.exports = APIFilters;

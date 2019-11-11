class criteria {
  constructor(gender,height,ethnicity,age) {
    this._gender =gender;
    this._height =height;
    this._age =age;
    this._ethnicity =ethnicity;
  }

  get gender() {
    return this._gender;
  }
  
    get ethnicity() {
    return this._ethnicity;
  }

  get age() {
    return this._age;
  }

  get height() {
    return this._height;
  }

  set gender(newgender) {
      this._gender = newgender;

  }
  
    set ethnicity(newethnicity) {
    this._ethnicity = newethnicity;
  }

  set age(newage) {
        this._age = newage;
  }

  set height(newheight) {
        this._height = newheight;
  }
}
module.exports = criteria;
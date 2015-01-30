export
default class TripTools {
  constructor() {
    this.MS_PER_DAY = 24 * 60 * 60 * 1000;
    this.COMMENT_TRIM_LENGTH = 50;
    this.dateFormat = 'd MMMM yyyy';
  }

  trimComment(str, len) {
    return S(str).truncate(len || this.COMMENT_TRIM_LENGTH).s;
  }

  eta(date) {
    date = new Date(date);
    var today = new Date();
    var days = Math.ceil((date - today) / this.MS_PER_DAY);
    if (days === 0) {
      days = 'Today!';
    } else if (isNaN(days) || days < 0) {
      days = '-';
    }
    return days;
  }
}
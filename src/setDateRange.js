const dayjs = require('dayjs')

module.exports.setDateRange = function (start, end) {
   return {
       start: dayjs(start).format('YYYY-MM-DD'),
       end: dayjs(end).add(1, 'day').format('YYYY-MM-DD')
   }

}

var dummyjson = require('dummy-json')
  , fs = require('fs');

var template = '{"users":[{{#repeat 300}}' +
  '{' +
    '"name": "{{firstName}} {{lastName}}",' +
    '"email": "{{email}}",' +
    '"phone": "{{phone}}",' +
    '"group": "{{group}}"' +
  '}' +
  '{{/repeat}}]}';

var myHelpers = {
  group: function() {
    // Use dummyjson random to ensure the seeded random number generator is used
    var randomVal = dummyjson.utils.random();
    if (randomVal < 0.2) {
      return 'Менеджеры';
    } else if (randomVal < 0.4) {
      return 'Дизайнеры';
    } else if (randomVal < 0.6) {
      return 'Разработчики';
    } else if (randomVal < 0.8) {
      return 'Тестировкищи';
    } else {
      return null;
    }
  }
};
var result = dummyjson.parse(template, {helpers: myHelpers});
fs.writeFileSync('./users.json', result, 'utf-8');

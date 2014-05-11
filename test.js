var test = require('prova');
var dom = require("./");
var ul, foo, bar, qux;

test('add: adds given element', function (t) {
  reset();
  t.plan(1);

  dom.add(ul, bar);
  t.equal(ul.lastChild, bar);
});

test('add: adds array of elements', function (t) {
  reset();
  t.plan(3);

  dom.add(ul, [bar, '<li>corge</li><li>span</li>']);
  t.equal(ul.lastChild.previousSibling.previousSibling, bar);
  t.equal(ul.lastChild.previousSibling.innerHTML, 'corge');
  t.equal(ul.lastChild.innerHTML, 'span');
});

test('add: parses HTML if required', function (t) {
  reset();
  t.plan(1);

  dom.add('ul', '<li class="{name}">{name}</li>', { name: 'corge' });
  t.equal(ul.lastChild, document.querySelector('li.corge'));
});

test('addBefore: adds given element before reference', function (t) {
  reset();
  t.plan(2);

  dom.addBefore(ul, bar, qux);
  t.equal(ul.lastChild, qux);
  t.equal(qux.previousSibling, bar);
});

test('addBefore: parses HTML if required', function (t) {
  reset();
  t.plan(2);

  dom.addBefore('ul', '<li class="{name}">{name}</li>', { name: 'corge' }, qux);
  t.equal(ul.lastChild, qux);
  t.equal(ul.lastChild.previousSibling, document.querySelector('li.corge'));
});

test('addAfter: adds given element after reference', function (t) {
  reset();
  t.plan(2);

  dom.addAfter(ul, bar, foo);
  t.equal(ul.lastChild, qux);
  t.equal(qux.previousSibling, bar);
});

test('addAfter: adds after last element', function (t) {
  reset();
  t.plan(2);

  dom.addAfter('ul', bar, qux);
  t.equal(ul.lastChild, bar);
  t.equal(bar.previousSibling, qux);
});


test('addAfter: parses HTML if required', function (t) {
  reset();
  t.plan(2);

  dom.addAfter(ul, '<li class="{name}">{name}</li>', { name: 'corge' }, foo);
  t.equal(ul.lastChild, qux);
  t.equal(ul.lastChild.previousSibling, document.querySelector('li.corge'));
});

test('insert: inserts element to parent', function (t) {
  reset();
  t.plan(1);

  dom.insert(bar, ul);
  t.equal(ul.lastChild, bar);
});

test('insert: parses HTML if required', function (t) {
  reset();
  t.plan(1);

  dom.insert('<li class="{name}">{name}</li>', { name: 'corge' }, 'ul');
  t.equal(ul.lastChild, document.querySelector('li.corge'));
});

test('replace: replaces target with repl', function (t) {
  reset();
  t.plan(1);

  dom.replace(ul, qux, bar);
  t.equal(ul.lastChild, bar);
});

test('replace: parses HTML if required', function (t) {
  reset();
  t.plan(1);

  dom.replace('ul', qux, '<li class="{name}">{name}</li>', { name: 'corge' });
  t.equal(ul.lastChild, document.querySelector('li.corge'));
});

test('remove: removes given element', function (t) {
  reset();
  t.plan(1);

  dom.remove(foo);
  t.equal(ul.firstChild, qux);
});

test('remove: removes by css query', function (t) {
  reset();
  t.plan(1);

  dom.remove('ul li');
  t.equal(ul.firstChild, null);
});

test('remove: allows specifying a parent element', function (t) {
  reset();
  t.plan(2);

  dom.remove(ul, '*');
  t.equal(ul.firstChild, null);
  t.equal(document.body.firstChild, ul);
});

test('remove: allows parent element to be a query, too', function (t) {
  reset();
  t.plan(2);

  dom.remove('ul', '*');
  t.equal(ul.firstChild, null);
  t.equal(document.body.firstChild, ul);
});

function reset () {
  document.body.innerHTML = '<ul class="ul"><li>foo</li><li>qux</li></ul>';
  ul = document.querySelector('ul');
  foo = ul.firstChild;
  bar = document.createElement('li');
  bar.innerHTML = 'bar';
  qux = foo.nextSibling;
};

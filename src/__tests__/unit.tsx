import reducer, { insertEntry, updateEntry, removeEntry, ArticlesState, loadArticlesState } from '../features/articles/articlesSlice';

test('the store should have its initial data when created', () => {
	const initial = loadArticlesState();
	const result = reducer(undefined, {type:''});
	expect(result).toEqual(initial);
})

test('the store should handle an entry added to an empty list', () => {
	const empty = { list: [] } as ArticlesState;
	const result = reducer(empty, insertEntry({title:'testA'}));

	expect(result).toEqual({
		list: [
			{id:1, title: 'testA'}
		]
	});
});

test('the store should have one less entry after one being removed', () => {
	const initial = loadArticlesState();
	const result = reducer(initial, removeEntry({ id: 1 }));
	expect(result.list.length).toBe(2);
});

test('the store should have the same length when removing an id that does not exist', () => {
	const initial = loadArticlesState();
	const result = reducer(initial, removeEntry({ id: 6 }));
	expect(result.list.length).toBe(3);
});


test('the store should handle an entry being updated', () => {
	const empty = { list: [{id:5, title:'basic'}] } as ArticlesState;
	const result = reducer(empty, updateEntry({id:5, title:'new title'}));

	expect(result).toEqual({
		list: [
			{id:5, title: 'new title'}
		]
	});
});

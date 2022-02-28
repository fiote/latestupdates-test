/**
 * @jest-environment jsdom
 */

import React from 'react';
import { AppContent } from '../app/App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, within, testStore } from '../utils/test-utils';
import { Provider } from 'react-redux';

const TestApp = () => {
	return (
		<Provider store={testStore}>
			<AppContent />
		</Provider>
	);
}

test('the page should display the default items on load', async () => {
	// render the app
  	render(<TestApp />);
	// get the amount of entries on the store
	const list = testStore.getState().art.list;
	// check if the amount of items match the list
	expect(screen.getAllByRole("listitem").length).toBe(list.length);
});

test('the page should display an empty FORM modal when the add-button is clicked', async () => {
	// render the app
  	render(<TestApp />);
	// get the form modal
	const modal = screen.getByTestId("modal-FORM");
	// modal should not be visible
	expect(modal).not.toHaveClass('am-visible');
	// click the "add new" button
	screen.getByTestId("add-button").click();
	// the modal should be visible
	expect(modal).toHaveClass('am-visible');
	// gets all fields
	const titleInput = within(modal).getByTestId<HTMLInputElement>("title-input");
	const categoryInput = within(modal).getByTestId<HTMLInputElement>("category-input");
	const linkInput = within(modal).getByTestId<HTMLInputElement>("link-input");
	// check if fields are empty
	expect(titleInput.value).toBe('');
	expect(categoryInput.value).toBe('');
	expect(linkInput.value).toBe('');
	// get all paragraphs
	const titleP = within(modal).getByTestId("title-p");
	const categoryP = within(modal).getByTestId("category-p");
	const linkP = within(modal).getByTestId("link-p");
	// check if paragraphs are not marked as empty
	expect(titleP).not.toHaveClass('empty');
	expect(categoryP).not.toHaveClass('empty');
	expect(linkP).not.toHaveClass('empty');
});

test('the modal should close when clicking its close icon button', async () => {
	// render the app
  	render(<TestApp />);
	// get the form modal
	const modal = screen.getByTestId("modal-FORM");
	// click the "add new" button
	screen.getByTestId("add-button").click();
	// the modal should be visible
	expect(modal).toHaveClass('am-visible');
	// clicks the close icon
	within(modal).getByTestId("close-icon-modal").click();
	// the modal should be gone
	expect(modal).not.toHaveClass('am-visible');
});

test('the modal should apply error classes to paragraphs if the user tries to submit then empty', async () => {
	// render the app
  	render(<TestApp />);
	// get the form modal
	const modal = screen.getByTestId("modal-FORM");
	// click the "add new" button
	screen.getByTestId("add-button").click();
	// get all paragraphs
	const titleP = within(modal).getByTestId("title-p");
	const categoryP = within(modal).getByTestId("category-p");
	const linkP = within(modal).getByTestId("link-p");
	// get the modal submit button
	const button = within(modal).getByRole("button");
	// click the submit button
	button.click();
	// the modal should be visible
	expect(modal).toHaveClass('am-visible');
	// and all p's should be marked as empty
	expect(titleP).toHaveClass('empty');
	expect(categoryP).toHaveClass('empty');
	expect(linkP).toHaveClass('empty');
});

test('the modal should remove error classes from inputs after the user fills them', async () => {
	// render the app
  	render(<TestApp />);
	// get the form modal
	const modal = screen.getByTestId("modal-FORM");
	// click the "add new" button
	screen.getByTestId("add-button").click();
	// gets the title field and its title
	const input = within(modal).getByTestId<HTMLInputElement>("title-input");
	const p = within(modal).getByTestId("title-p");
	// empty the input
	userEvent.clear(input);
	// get the modal submit button
	const button = within(modal).getByRole("button");
	// click the submit button
	button.click();
	// the p should be marked as empty
	expect(p).toHaveClass('empty');
	// type some data into the input
	userEvent.type(input, 'Title here!');
	// the p should not be marked as empty anymore
	expect(p).not.toHaveClass('empty');
});

test('the edit modal should have its values filled based on the entry clicked', async () => {
	// render the app
  	render(<TestApp/>);
	// get the current number of displayed items
	const before = screen.getAllByRole("listitem");
	// get the first item
	const item = before[0];
	// get its data
	const entry = testStore.getState().art.list[0];
	// click the edit button
	within(item).getByTestId("edit-button").click();
	// get the form modal
	const modal = screen.getByTestId("modal-FORM");
	// modal should be visible
	expect(modal).toHaveClass('am-visible');
	// get the modal inputs
	const titleInput = within(modal).getByTestId<HTMLInputElement>("title-input");
	const categoryInput = within(modal).getByTestId<HTMLInputElement>("category-input");
	const linkInput = within(modal).getByTestId<HTMLInputElement>("link-input");
	// check their values
	expect(titleInput.value).toBe(entry.title);
	expect(categoryInput.value).toBe(entry.category);
	expect(linkInput.value).toBe(entry.link);
});


test('the add modal should close after a set of data is correctly submitted, and a new entry should be visible', async () => {
	// render the app
  	render(<TestApp />);
	// get the current number of displayed items
	const before = screen.getAllByRole("listitem");
	// get the form modal
	const modal = screen.getByTestId("modal-FORM");
	// click the "add new" button
	screen.getByTestId("add-button").click();
	// get the modal inputs
	const titleInput = within(modal).getByTestId<HTMLInputElement>("title-input");
	const categoryInput = within(modal).getByTestId<HTMLInputElement>("category-input");
	const linkInput = within(modal).getByTestId<HTMLInputElement>("link-input");
	// set some data
	const rng = Math.random();
	const form = {title: `Title ${rng} here!`, category: 'NEWS', link: 'https://google.com'};
	userEvent.type(titleInput, form.title);
	userEvent.selectOptions(categoryInput, form.category);
	userEvent.type(linkInput, form.link);
	// get the modal submit button
	const button = within(modal).getByRole("button");
	// click the submit button
	button.click();
	// get the current displayed items
	const after = screen.getAllByRole("listitem");
	// check if there are more items than there was before
	expect(after.length).toBeGreaterThan(before.length);
	// and if the last item matches what we just submitted
	const list = testStore.getState().art.list;
	const entry = list[list.length-1];
	const { title, category, link } = entry;
	expect({ title, category, link }).toEqual(form);
});

test('the confirmation modal should pops up when the delete button is clicked', async () => {
	// render the app
  	render(<TestApp />);
	// click the first delete button
	screen.getAllByTestId("delete-button")[0].click();
	// get the confirm modal
	const modal = screen.getByTestId("modal-CONFIRM");
	// the modal should be visible
	expect(modal).toHaveClass('am-visible');
});

test('the confirmation modal should close after being cancelled and the entry should still exists', async () => {
	// render the app
  	render(<TestApp />);
	// get the current number of displayed items
	const before = screen.getAllByRole("listitem");
	// click the first delete button
	screen.getAllByTestId("delete-button")[0].click();
	// get the confirm modal
	const modal = screen.getByTestId("modal-CONFIRM");
	// the modal should be visible
	expect(modal).toHaveClass('am-visible');
	// get the modal cancel button
	const button = within(modal).getByTestId("cancel-button");
	// click the submit button
	button.click();
	// the modal should be visible
	expect(modal).not.toHaveClass('am-visible');
	// get the current displayed items
	const after = screen.getAllByRole("listitem");
	// check if there are more items than there was before
	expect(after.length).toBe(before.length);
});

test('the confirmation modal should close after being confirmed and the entry should no longer exists', async () => {
	// render the app
  	render(<TestApp />);
	// get the current displayed items
	const before = screen.getAllByRole("listitem");
	// click the first delete button
	screen.getAllByTestId("delete-button")[0].click();
	// get the confirm modal
	const modal = screen.getByTestId("modal-CONFIRM");
	// the modal should be visible
	expect(modal).toHaveClass('am-visible');
	// get the modal cancel button
	const button = within(modal).getByTestId("confirm-button");
	// click the submit button
	button.click();
	// the modal should not be visible
	expect(modal).not.toHaveClass('am-visible');
	// get the current displayed items
	const after = screen.getAllByRole("listitem");
	// the first item should no longer be the same
	expect(before[0]).not.toBe(after[0]);
	// checks if the number of displayed item changed
	expect(after.length).toBeLessThan(before.length);
});
import errImport from '../data/validation-errors.json';
import logging from './logging';

interface ValidationErrors {
	GAME: TraversableObject;
	GROUP: TraversableObject;
	GAME_VERSION: TraversableObject;
	GAME_NAMESPACE: TraversableObject;
	IDENTITY_PROFILE: TraversableObject;
	GROUP_PROFILE: TraversableObject;
	DEV_TOKEN: TraversableObject;
	GAME_NAMESPACE_CONFIG: TraversableObject;
}

// Typed JSON
export const VALIDATION_ERRORS = errImport as ValidationErrors;

export type TraversableObject = { [key: string]: TraversableObject | string };

export class TraversableError {
	path: string[];
	formattingInstructions: TraversableObject;

	constructor(formattingInstructions: TraversableObject, path: string[]) {
		this.formattingInstructions = formattingInstructions;
		this.path = path;
	}

	format(formatInstructions: TraversableObject = this.formattingInstructions) {
		return formatError(this.path, formatInstructions);
	}
}

export class TraversableErrors {
	errors: TraversableError[] = [];
	formattingInstructions: TraversableObject;
	prefix: string[] = [];

	constructor(formattingInstructions: TraversableObject, paths?: string[][]) {
		if (!formattingInstructions) throw new Error('Invalid formatting instructions');

		this.formattingInstructions = formattingInstructions;
		this.load(paths ?? []);
	}

	load(paths: string[][]) {
		this.errors = paths.map(a => new TraversableError(this.formattingInstructions, a));
	}

	loadBranch(branch: ErrorBranch) {
		this.errors = branch.errors;
		this.prefix = branch.prefix;
	}

	isEmpty() {
		return !this.errors.length;
	}

	// Finds all errors that start with pathQuery
	find(...pathQuery: (string | number)[]) {
		let errors = [];
		let expandedQuery = [...this.prefix, ...pathQuery];

		// Return all errors
		if (expandedQuery.length == 0) {
			return Array.from(this.errors);
		}

		for (let error of this.errors) {
			if (error.path.length < expandedQuery.length) continue;

			for (let i = 0, l = expandedQuery.length; i < l; i++) {
				if (error.path[i] == expandedQuery[i].toString()) {
					if (i == l - 1) {
						errors.push(error);
						break;
					}
				} else {
					break;
				}
			}
		}

		return errors;
	}

	findFormatted(...pathQuery: (string | number)[]) {
		return this.find(...pathQuery).map(a => a.format());
	}

	// Finds all errors that start with pathQuery (only at a depth of +1)
	findShallow(...pathQuery: (string | number)[]) {
		let errors = [];
		let expandedQuery = [...this.prefix, ...pathQuery];

		for (let error of this.errors) {
			if (error.path.length != expandedQuery.length + 1) continue;

			if (expandedQuery.length == 0) {
				errors.push(error);
			} else {
				for (let i = 0, l = expandedQuery.length; i < l; i++) {
					if (error.path[i] == expandedQuery[i].toString() && i == l - 1) {
						errors.push(error);
						break;
					}
				}
			}
		}

		return errors;
	}

	findShallowFormatted(...pathQuery: (string | number)[]) {
		return this.findShallow(...pathQuery).map(a => a.format());
	}

	branch(...pathQuery: (string | number)[]): ErrorBranch {
		return {
			errors: this.find(...pathQuery),
			prefix: [...this.prefix, ...pathQuery.map(a => a.toString())]
		};
	}
}

export interface ErrorBranch {
	errors: TraversableError[];
	prefix: string[];
}

// TODO: Use indicies to locate where to put the error
function formatError(error: string[], traverseStart: TraversableObject) {
	let traverse: TraversableObject | string = traverseStart;

	for (let topic of error) {
		// Skip indicies
		if (!isNaN(parseInt(topic))) continue;

		if (typeof traverse == 'string') return traverse;

		// Check if error path exists
		if (traverse.hasOwnProperty(topic)) {
			traverse = traverse[topic];
		}
		// Invalid error path
		else {
			logging.error('Unknown traversable error', error);
			return `${error.join('.')}`;
		}
	}

	return typeof traverse == 'string' ? traverse : null;
}

// Plugins
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';


// Configs
const configs = {
	name: 'foundationPureHtml',
	files: ['main.js', 'detects.js', 'another-file.js'],
	// formats: ['iife', 'es', 'amd', 'cjs'],
	formats: ['es'],
	default: 'es',
	pathIn: 'src/resource/js',
	pathOut: 'dist/resource/js',
	minify: true,
	sourceMap: false
};

// Banner
const banner = `/*! ${configs.name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author.name} */`;

const createOutput = function (filename, minify) {
	return configs.formats.map(function (format) {
		const output = {
			// file: `${configs.pathOut}/${filename}${format === configs.default ? '' : `.${format}`}${minify ? '.min' : ''}.js`,
			file: `${configs.pathOut}/${filename}${format === configs.default ? '' : `.${format}`}.js`,
			format: format,
			banner: banner
		};
		if (format === 'iife') {
			output.name = configs.name ? configs.name : pkg.name;
		}
		if (minify) {
			output.plugins = [terser()];
		}

		output.sourcemap = configs.sourceMap

		return output;
	});
};

/**
 * Create output formats
 * @param  {String} filename The filename
 * @return {Array}           The outputs array
 */
const createOutputs = function (filename) {

	// Create base outputs
	const outputs = createOutput(filename);

	// If not minifying, return outputs
	if (!configs.minify) return outputs;

	// Otherwise, ceate second set of outputs
	const outputsMin = createOutput(filename, true);

	// Merge and return the two arrays
	return outputs.concat(outputsMin);

};

/**
 * Create export object
 * @return {Array} The export object
 */
const createExport = function (file) {
	return configs.files.map(function (file) {
		const filename = file.replace('.js', '');
		return {
			input: `${configs.pathIn}/${file}`,
			output: createOutputs(filename)
		};
	});
};

export default createExport();

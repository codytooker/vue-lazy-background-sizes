module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	'vue/html-indent': ['error', 'tab'],
	'no-tabs': 'off',
	'indent': ['error', 'tab'],
	'semi': ['error', 'always', {
		'omitLastInOneLineBlock': true,
	}],
	'comma-dangle': ['error', 'always-multiline'],
	'space-before-function-paren': ["error", "never"],
	'handle-callback-err': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
const bar = prompt('bar?', '')
const count = prompt('count?', '42')

module.exports = {
    key: 'value',
    foo: {
        bar: bar,
        count: count
    },
    name: prompt('Please Enter Name:', process.cwd().split('/').pop()),
    version: prompt('Please Enter Version:', '0.0.1'),
    description: prompt('Please Enter Description:', ''),
    main: 'index.js',
}
const { default: store } = process.env.NODE_ENV === 'production'
  ? require('./storeDev')
  : require('./storeDev')

// Exporting the store, then use it anywhere like store.getState() or store.dispatch()
module.exports = store()
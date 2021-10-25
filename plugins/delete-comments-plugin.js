class DeleteCommentsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('RemoveComments', compilation => {
      for(const name in compilation.assets) {
        if(name.endsWith('.js')) {
          const contents = compilation.assets[name].source();
          const noComments = contents.replace(/\/\/\s?startDelete[\d\D]*\/\/\s?endDelete/g, '');
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}

module.exports = DeleteCommentsPlugin;
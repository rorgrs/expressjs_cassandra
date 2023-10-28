const path = require('path')
const fs = require('fs')

var db = []
var nomeArquivoJson = 'articles'

//Atualiza a variavel local do banco de dados conforme o arquivo
function refresh() {
    const data = fs.readFileSync(path.join(__dirname, '../data/' + nomeArquivoJson + '.json'), 'utf8')
    db = JSON.parse(data)
}

module.exports = function () {
    return function (req, res, next) {
        try {
            refresh()
            var indexArtigo = db.findIndex(e => e.kb_id == parseInt(req.params.id))
            db[indexArtigo].kb_liked_count++
            fs.writeFileSync(path.join(__dirname, '../data/articles.json'), JSON.stringify(db))
            next()
        } catch (error) {
            res.status(500).send('Erro ao incrementar like do artigo.')
        }
    }
}
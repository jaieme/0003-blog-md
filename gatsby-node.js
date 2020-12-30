const path = require('path');
exports.createPages = async ({ graphql , actions }) => {
    const { createPage } = actions

    //aqui ha uma diferenca de sintaxe na query pq aqui
    //      quem executa é página*, e por isso graphql (``)
    //qdo no arquivo blog.js, a executação é por conta do
    //      useStaticQuery
    //sobre o * - ainda entender o que isso quer dizer mas
    //      acho que tem a ver com a execucao das funcoes 
    //      createPages, async e await...acho
    const postsQueryGatsbyNode = await graphql(`
    query MyQuery {
        posts1: allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        title
                        path
                        description
                    }
                }
            }
        }
    }
    `
    )
    //console.log(postsQueryGatsbyNode)
    //console.log(postsQueryGatsbyNode.data.posts1.edges)
    //a ideia desse console.log é ver onde está o array
    //      pois e sobre que faremos as acoes pois dentro 
    //      dele estao os dados q queremos.
    //encontrado o array, entao comeca a trabalhar com forEach
    const template = path.resolve('src/templates/post.js')
    postsQueryGatsbyNode.data.posts1.edges.forEach( dentroDoArrayGatsbyNode => {
        //com o console abaixo ve-se o conteudo dos arquivo .md
        //console.log(dentroDoArrayGatsbyNode)
        // feito o debug acima, agora é chamar as paginas, pensando nos:
        //      path; content; template.
        createPage({
            path: dentroDoArrayGatsbyNode.node.frontmatter.path,
            component: template,
            context:{
                id:  dentroDoArrayGatsbyNode.node.frontmatter.path
            }
        })
    });
//a partir daqui para baixo começa a paginacao do site
// comecou no video de Gerando Paginacao - Modulo 2


const templateBlog = path.resolve('src/templates/blog.js')
//definindo 2 pagina por pagina
const pageSize = 2
//verifica q qte de pagina existntes
const totalPosts = postsQueryGatsbyNode.data.posts1.edges.length
//teste --- console.log(postsQueryGatsbyNode.data.posts1.edges.length)
//quantas paginas eu vou ter
const numPages = Math.ceil(totalPosts / pageSize)
//teste de paginas
//console.log(numPages)

//agora, para cada pagina  é preciso gerar um pagina blog dinamicamente, entao..
//teste verifica e numpages e coloca num array pois usara em todas as paginas
//console.log(Array.from({length: numPages}))

//teste de array 2, ver se aparece a qte de paginas
/*Array
    .from({length: numPages})
    .forEach((_, i) =>{
        console.log('gen', i)
    })*/

//agora teste porque não faz sentido aparecer pagina 0
Array
    .from({length: numPages})
    .forEach((_, i) =>{
        //teste
        //console.log(i === 0 ? '' : '/' +i)
        createPage({
            path: '/blog' + (i === 0 ? '' : '/' +i),
            component: templateBlog,
            context: {
                limit: pageSize,
                skip: i * pageSize,
                numPages,
                currentPage: i 
            }
        }) 
    })
}



const path = require('path')
// qdo do capitulo Custom fields slug (baseado no nome do diretório)
// houve o inicio do desenvlvimento de extrair parte de um nome de pagina para 
// essa mesma ser o caminho URL, tudo dinamicamente
const { createFilePath } = require('gatsby-source-filesystem') //createFilePat cria um FilePath para um no!..ou seja, 
//agora é extrair  valor...e para sso o codigo esta mais para baixo 

// esse onCreateNode ele iniciou no capitulo Custom Fields (Collections)
// motivo: depois que quebrar o pages, pois nao estava preparado para authors,
// e de efetuar um debud na parte do codigo do pagequery
// e de olhar no GraphQl uma forma de separar Author dos Makdow 
// ja meus, pois estao todos juntos (ei que essa parte eu nao ente
// muito bem...enfim)...e comecou em olhar nesse onCreateNode
// pois em Gatsby tudo e node e de uma forma, por ai, é o caminho
// entao ele fez um debub inicial, abaixo:
/*exports.onCreateNode = ({ node }) => {  
    console.log(node)
}*/
// teste dois...por algum motivo era relevante o markdownRemark
// entao o teste 2, abaixo:
/*exports.onCreateNode = ({ node }) => {  
    if (node.internal.type === 'MarkdownRemark'){
    console.log(node)
    }
}*/
//o teste2 eu mesmo ainda nao entendi a logico nos debugs
// ainda que eu tenha entendido o que ele procura
// entao o teste 3!, um conceito de pegar o pai do No
// Abaixo:
/*exports.onCreateNode = ({ node , getNode }) => {  
    if (node.internal.type === 'MarkdownRemark'){
    console.log(getNode(node.parent))   
    }
}*/
// eis que com o resultado do teste 3, onde ele procurava a 
// palavra authors (e isso eu n tava entendendo antes, agora sim),
// que o que o teste dois ele usa isso  sourceInstanceName: 'authors'
// teste 4 abaixo:
/*exports.onCreateNode = ({ node , getNode }) => {  
    if (node.internal.type === 'MarkdownRemark'){
    const contentName = getNode(node.parent).sourceInstanceName
    console.log(contentName)   
    }
}*/
///eis que agora ele achou o authors, mas ainda falta algo..
//e esse algo nao deu pra entender nao kkkk dificil ainda pra mim
// teste 5, abaixo
exports.onCreateNode = ({ node , getNode , actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === 'MarkdownRemark'){
        const contentName = getNode(node.parent).sourceInstanceName
        createNodeField({
            name: 'collection',
            node,
            value: contentName
        }),

        //abaixo é o desenvolvimento da ideia Custom fields slug (baseado no nome do diretório)
        //onde, declarado a const no inicio desse codigo, passa-se a bucar o caminho por aqui
        //lembrando, esse codigo e para gerar o caminho url de acordo com titulos dos post
        //dinamicamanete...lembrnado que nao se sabe de antemao os nomes dos posts

        //debug, porem motivo eu ainda nao entendi
        //console.log(createFilePath({ node, getNode }))
        // o teste do console acime tras uma resposta de caminhos como
        // /outra-pagina/ minha-pagina/ /enviando-para-o-site/...ou seja, interessante para criar slugs...ou seja
        // esta og abaixo essa ideia
        createNodeField({
            name: 'slug',
            node,
            value: createFilePath({ node, getNode }) //eis que depois de inserir esse campo, esse carregou o Graphiql
            // para ver que campo inserir na query e esse campo foi fields {slug}...dentro de authorsMeu
            // e tb anterado campos na createPage do dentroDoArrayGatsbyNodeAuthors, que precisa desse caminho para a URL dinamica
            // e que ficou id com final fields.slug e onde antes era frontmatter.path e tb trocou em path o que era
            // frontmatter.title e passou para fields.slug tb...mas que so para teste de carregar pagina, num contextp estatico, a
            // fila na condicao de frontmatter.title
        })


        // daqui para cima é sobre Custom fields slug (baseado no nome do diretório)

    }
}
// entao para o teste acima e foi para Grapgql
// e la carregou o allmarkdownremark.fields.collections.eq (filter: {fields: {collection: {eq: "pages"}}})
// ((acho que na pratica ela nao tava atento antes e passou reto
// la no comeco...enfim)) eis que ele aplicou (filter: {fields: {collection: {eq: "pages"}}})
// na query ja existente.
// entao, nesse momento, o debug parcial setado no comeco
// foi desabilitado e visto o que acontecia. o site 
// tem que voltar a rodas, porem ainda da forma que ja funcionava
// com o plus que agora da para trabalhar com filtros page e authors
// entao foi no graphiql para ver esse novo filtro, com authors..









exports.createPages = async ({ graphql , actions }) => {
    const { createPage } = actions

    //aqui ha uma diferenca de sintaxe na query pq aqui
    //      quem executa é página*, e por isso graphql (``)
    //qdo no arquivo blog.js, a executação é por conta do
    //      useStaticQuery
    //sobre o * - ainda entender o que isso quer dizer mas
    //      acho que tem a ver com a execucao das funcoes 
    //      createPages, async e await...acho
    // o campo da query fields {slug}, dentro de authorsMeu, foi inserido
    //      qdo do comando creteFilePaath, para criar URL dinamica aos proprios
    //      proprios posts tb dinamicos
    const postsQueryGatsbyNode = await graphql(`
    query MyQuery {
        posts1: allMarkdownRemark (filter: {fields: {collection: {eq: "pages"}}}) {
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
        authorsMeu: allMarkdownRemark(filter: {fields: {collection: {eq: "authors"}}}) {
            edges {
                node {
                    frontmatter {
                        title
                    }
                    fields {
                        slug
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
        //parte inserida qdo da parte de authors do netlify
        const templateAuthor = path.resolve('src/templates/author.js')
        postsQueryGatsbyNode.data.authorsMeu.edges.forEach( dentroDoArrayGatsbyNodeAuthors => {
            //com o console abaixo ve-se o conteudo dos arquivo .md
            //console.log(dentroDoArrayGatsbyNodeAuthors)
            // feito o debug acima, agora é chamar as paginas, pensando nos:
            //      path; content; template.
            createPage({
                path: dentroDoArrayGatsbyNodeAuthors.node.fields.slug,
                component: templateAuthor,
                context:{
                    id:  dentroDoArrayGatsbyNodeAuthors.node.fields.slug
                }
            })//ao fim dessa insercao dentroDoArrayGatsbyNodeAuthors.node.frontmatter.title
            // estara disponivel as pagina do netlify.
            // busquee no browser por http://localhost:8000/segundo%20upload%20foto
            //nova insercao dentroDoArrayGatsbyNodeAuthors.node.fields.slug:
            // ao fim do createFilePath sera so digitar o nome
            // dos titulos dos los criados no Netlify logo depois do
            // dominio na URL que ira diretor para a pagina
            // lembrando que com os slugs houve ums padronizacao
            // dentro do cntexto slugs
            // ou seja na url agora e so http://localhost:8000/segundo-upload-foto ou http://localhost:8000/enviando-para-o-site/
            // muito melhor dinamico do que com caracteres malucos, antes sem o slug e sem ser dinamico.
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



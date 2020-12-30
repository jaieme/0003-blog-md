//arquivo de listagem de todo conteudo do blog
import React from 'react'
//abaixo é para pegar todas as paginas pelo os sources Filesystem e Remark
import { graphql , Link } from 'gatsby'
import Seo from '../components/Seo'
import Img from 'gatsby-image'

const Blog = (props) => {
const { data , pageContext } = props
const pages = Array.from({length: pageContext.numPages })
// teste dentro do return --- <pre>{JSON.stringify(posts1.edges.node, null, 2)}</pre>
// teste2 dentro do segundo return --- <pre>{JSON.stringify(qqnome, null, 2)}</pre>
//const posts1 = useStaticQuery (QUERY) // desse jeito no json.string aparece posts. Eis que depois ele fez o debaixo pois ...
//const { posts1 } = useStaticQuery (QUERY) // { posts } nesse formado vem o que ta dentro de post, excluindo post.

//qdo do capitulo de Gerando paginacao eis que o
// conceito dessa pagina mudou, agora é dinamica.
// Por esse motivo mudou a pasta, antes em pages,
// agora em templates.
//Outra mudanca e, qdo se pudar para forma dinamica
//  o useStaticQuery nao funciona mais, agora é
//  é o pageQuery.
// esse { qqnome.frontmatter.banner && < Img fluid={data.qqnome.frontmatter.banner.childImageSharp.fluid}/>}
// foi acrescentado qdo da insercao do capitulo markdown e imagens qdo falando de banner
// e tb explicado o contexto da condicional, pois da pau se nao tem na condicao
// de nao possui banner
return (
        <div>
            <Seo title='pagina pages/blog.js'/>
            <h1>Blog</h1>
            <pre>{/*JSON.stringify(props, null, 2)*/}</pre>
            <pre>{/*JSON.stringify(data.posts1.edges , null, 2)*/}</pre>
            {/* abaixo debug p saber se aparece paginacao*/}
            <pre>{/*JSON.stringify(pageContext)*/}</pre>
            {/* abaixo debug p saber se aparece paginas ativas*/}
            <pre>{/*JSON.stringify(pages)*/}</pre>
            {data.posts1.edges.map (qqnome =>{
                return (
                    <div>
                        { qqnome.node.frontmatter.banner && <Img fluid={qqnome.node.frontmatter.banner.childImageSharp.fluid}/>}
                        <pre>{/*JSON.stringify(qqnome.node.frontmatter , null, 2)*/}</pre>
                        <h3><Link to={qqnome.node.frontmatter.path}>{qqnome.node.frontmatter.title}</Link></h3>
                        <p>{qqnome.node.frontmatter.description}</p>
                    </div>
                )
            })}
            {/* o <ul><li> foram inseridos depois, 
            ai mudou a apresentacao do indices de paginacao*/}
            <ul>
            {/* abaixo esta a logica de mini paginacao no rodade da pagina*/}
            {pages.map((_, page) =>{
                return (
                    <li>
                        {/*abaixo um cond de qdo Zero deixa em branco em blog
                        e se dif de Zero mostra o numero*/}
                        <Link to={'/blog' + (page === 0 ? '' : '/' + page)}>
                            {pageContext.currentPage === page ? ' >> ' : ''}
                            {/*somado mais um para nao mostrar Zero na paginacao*/}
                            {page + 1}
                            {pageContext.currentPage === page ? ' << ' : ''}
                        </Link>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

//o tulia arruma e insere a query e nomeia, nesse caso do nome, 
// como QUERY, e depois repete la embaixo, assim fica mais limpo.

//o nome posts1 não e obrigatorio as é um alias. Ou seja,
// é possivel trabalhar com a mesma query, porém atribuir
// outro alias, exemplo, post2. (no video o tulio insere outro alias)
export const pageQuery = graphql`
query ($skip: Int!, $limit: Int!){
posts1: allMarkdownRemark (skip: $skip, limit: $limit){
            edges {
                node {
                    frontmatter {
                        title
                        path    
                        description
                        banner {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                }
            }
        }
    }
}
`

export default Blog
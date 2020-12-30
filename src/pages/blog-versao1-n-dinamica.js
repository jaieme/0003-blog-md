//arquivo de listagem de todo conteudo do blog
import React from 'react'
//abaixo é para pegar todas as paginas pelo os sources Filesystem e Remark
import { graphql , useStaticQuery , Link } from 'gatsby'
import Seo from '../components/Seo'

//qdo do capitulo de Gerando paginacao eis que o
// conceito dessa pagina mudou, agora é dinamica.
// Por esse motivo mudou a pasta, antes em pages,
// agora em templates.


//o tulia arruma e insere a query e nomeia, nesse caso do nome, 
// como QUERY, e depois repete la embaixo, assim fica mais limpo.

//o nome posts1 não e obrigatorio as é um alias. Ou seja,
// é possivel trabalhar com a mesma query, porém atribuir
// outro alias, exemplo, post2. (no video o tulio insere outro alias)
const QUERY = graphql`
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


const Blog = () => {
// teste dentro do return --- <pre>{JSON.stringify(posts1.edges.node, null, 2)}</pre>
// teste2 dentro do segundo return --- <pre>{JSON.stringify(qqnome, null, 2)}</pre>
//const posts1 = useStaticQuery (QUERY) // desse jeito no json.string aparece posts. Eis que depois ele fez o debaixo pois ...
const { posts1 } = useStaticQuery (QUERY) // { posts } nesse formado vem o que ta dentro de post, excluindo post.
return (
        <div>
            <Seo title='pagina pages/blog.js'/>
            <h1>Blog</h1>
            { posts1.edges.map (qqnome =>{
                return (
                    <div>
                        <h3><Link to={qqnome.node.frontmatter.path}>{qqnome.node.frontmatter.title}</Link></h3>
                        <p>{qqnome.node.frontmatter.description}</p>
                    </div>
                )
            })}
        </div>
    )
}


export default Blog
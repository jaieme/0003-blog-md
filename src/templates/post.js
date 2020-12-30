import React from 'react'
import { graphql , Link } from 'gatsby'
import Seo from '../components/Seo'
import Img from 'gatsby-image'
//qdo da instalacao do disqus-react
//esse insere coments. qdo de cliente tem que pagar ele!!
import { DiscussionEmbed } from 'disqus-react'

//primeiro teste dentro do return numero 1
//      const Post = (props) =>
//      <pre>{JSON.stringify(props, null, 2)} </pre>
//teste dois, ou seja, qdo com props vem um cabecalho antes com dados
//      de propriedade de hostname, protocolo, chave, location...vario
//      e eis que qdo usando so data o "filtro" e especifico
//      no que sao os dados, dados aqui que sao o que eu produz.
//      const Post = ( {data} ) =>
//      e <pre>{JSON.stringify(data, null, 2)} </pre>
//comentario sobr:  dangerouslySetInnerHTML={{ __html}}
//      dentro do .md file tem html mas a pagina nao reconhece direto.
//      Eis que esse comando diz que e mesmo html e entao aparece em html o
//      proprio html do arquivo .md
// sobre { data.aliasPersonalizadoMeu.frontmatter.banner && < Img/>}
//  foi necessario o checker com && pois da pau nas paginas qdo nao acha
//      o banner nas imagens, mas obviamente nao e obrigotrio ter sempre.
//tb é possivel negar a expressar, abaixo:
//      { !data.aliasPersonalizadoMeu.frontmatter.banner && < Img/>}
const Post = ( {data} ) => {
    return(
        <div>
            <Seo title={data.aliasPersonalizadoMeu.frontmatter.title} 
            description={data.aliasPersonalizadoMeu.frontmatter.description} />
            { data.aliasPersonalizadoMeu.frontmatter.banner && < Img fluid={data.aliasPersonalizadoMeu.frontmatter.banner.childImageSharp.fluid}/>}
            <h1>{data.aliasPersonalizadoMeu.frontmatter.title}</h1>
            <p><Link to='/blog'>Voltar para o blog</Link></p>
            <div dangerouslySetInnerHTML={{ __html: data.aliasPersonalizadoMeu.html}}/>
            <DiscussionEmbed 
                shortname='powersitejeme' 
                config={{ identifier: data.aliasPersonalizadoMeu.frontmatter.path, title: data.aliasPersonalizadoMeu.frontmatter.title }}/>
        </div>
    )
}

//importado do graphipq era assim:
//    markdownRemark(frontmatter: {path: {eq: "/blog/outra-pagina"}}) {
//      porem como se quer olhar os id dos arquivos .md, eis que a
//      alteracao foi necessaria, foi é dinamico
//obs:nao entendi pq ele escolheu pageQuery 
//      ao inves de staticQuery ou useStaticQuery
//qdo do capitulo de markdown imagens, houve a insersao na query do que se segue
//  abaixo os campos partindo de banner, pois nem mesmo tinha nos arquivos .md

export const pageQuery = graphql`
    query($id: String!){
        aliasPersonalizadoMeu: markdownRemark(frontmatter: {path: {eq: $id}}) {
            frontmatter {
            path
            title
            description
            banner {
                childImageSharp{
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        html
    }
}
`

export default Post
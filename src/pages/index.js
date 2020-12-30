//
import React from 'react'
import { Link } from 'gatsby'
import Seo from '../components/Seo'


//tudo que colocar entre o <Helmet> vai para o Head da página
//         ou seja, cabeçalho.
//no campo meta os dados aqui aparecem na busca google, porem
//  qdo em condicoes relevantes a busca do usuário.   
const Index = () => {
    return (
        <div>
            <Seo title='Nosso Blog' description='valor da desc. Meu'/>
            <h1>Power Sites</h1>
            <Link to='/blog'>Blog</Link>
        </div>
    )
}


export default Index
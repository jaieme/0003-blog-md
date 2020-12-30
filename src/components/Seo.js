import React from 'react'
//pluging Helmet - para manipular o head da pagina, onde dentro 
//      tem o description, o title..importante para SEO!
import Helmet from 'react-helmet'

// posteriormente foi inserido o {description && blablabla}
//  é q qdo nao tem eu nao defino um description ele nao aparece em branco
//  qdo de F12 e olhando description, ou seja, é um condicional que
//  faz aparecer ou sumir.
const Seo = ({title , description}) => {
    return(
        <Helmet>
                <title>{title}</title> 
                {description && <meta name='description' content={description} />}
        </Helmet>
    )
}

export default Seo

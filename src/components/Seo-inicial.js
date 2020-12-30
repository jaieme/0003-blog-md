import React from 'react'
//pluging Helmet - para manipular o head da pagina, onde dentro 
//      tem o description, o title..importante para SEO!
import Helmet from 'react-helmet'

const Seo = () => {
    return(
        <Helmet>
                <title>Nosso Blog</title> 
                <meta name='description Meu' content='valor da desc. Meu' />
        </Helmet>
    )
}

export default Seo
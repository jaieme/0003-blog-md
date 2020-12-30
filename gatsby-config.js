//Esse arquivo quer dizer que as paginas do meu site
//      estarao nesse local aqui.
//Nessa pasta é onde se le o arquivos, no caso os markdown (MD), e 
//      onde posteriormente havera a transformacacao (transformer)
module.exports = {
    plugins:[
        {
            resolve: 'gatsby-source-filesystem', //identifica o diretorio abaixo como fonte.
            options: { 
                path: __dirname + '/src/content', //uma fonte de dados no diretorio
                                                 //   ou no filesystem.
                name: 'pages', //um tipo de alias para o path acima.
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 540
                        }
                    }
                ]
            }
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-netlify-cms'
    ]
}
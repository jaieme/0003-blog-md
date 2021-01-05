//Esse arquivo quer dizer que as paginas do meu site
//      estarao nesse local aqui.
//Nessa pasta é onde se le o arquivos, no caso os markdown (MD), e 
//      onde posteriormente havera a transformacacao (transformer)
module.exports = {
    plugins:[
        {
            resolve: 'gatsby-source-filesystem', //identifica o diretorio abaixo como fonte.
            options: { //pelo que eu entedi, ate pq qdo do capitulo custom
                //fields (collection), aqui esta a configuracao do diretorio
                // principal index..mas em breve entendo melhor..mas tem
                // a ver com os arquivos estaticos, acho
                path: __dirname + '/src/content', //uma fonte de dados no diretorio
                                                 //   ou no filesystem.
                name: 'pages', //um tipo de alias para o path acima.
            },
        },
        {//abaixo comeca o desenvolvimento de como mostrar a secao
            // author presente no config.yml na webpage.
            resolve: 'gatsby-source-filesystem', //identifica o diretorio abaixo como fonte.
            options: { //pelo que eu entedi, ate pq qdo do capitulo custom
                //fields (collection), e entao o Tulio acrescentou abaixo
                // ara achar os arquivos index estaticos, so que agora
                // o do markdow
                path: __dirname + '/src/authors', //esse dados ele pegou do arquivo config.yml
                name: 'authors', //esse dados ele pegou do arquivo config.yml
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
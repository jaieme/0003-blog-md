---
# area de frontmatter, ou seja, campo de meta dados o markdow
# ou seja criar algo invisivel nos texto, mas que e campo valido
# para casos de SEO e tantos outros
# exemplos abaixo


path: '/blog/minha-pagina'
title: 'FOTO - Minha página - info do campo title do Arquivo .MD'
description: 'info no campo description do Arquivo .MD'

# é possivel ir longe...criar categorias, prices...enfim

categories: 'categoria'
price: 10

# tulia usa frontmatter apra descrever podcast episodios...

### Mudar para o .jd principal!!!
### objetivo do exercicio: listar postagens e gerar páginas
###     dinamicamente.

# abaixo foi colocando quando do capitulo markdown e imagens
#   qdo de separar uma pasta para cada .md file e ai 
#   considerar entao como index.md e qdo da instalacao 
#   do remark-images e outro, para incorporar fts em markdown
banner: './img1.jpg'
---

# minha pagina feita no arquivo markdown
## ou seja, arquivo de extensao md e que possui metadados e conteudo, onde o conteudo tb ao dados.

#a exclamacao é indicando a ft e dentro do parentesis e 'caminho, no caso caminho relativo.
![caso nao apareca a ft](./img1.jpg)

![caso nao apareca a ft](../img2.jpg)

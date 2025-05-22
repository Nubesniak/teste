# Spotmusic

## Estrutura da Tabela `usuario`
```sql
CREATE TABLE spotmusic.usuarios (
  idusuarios INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(120) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (idusuarios),
  UNIQUE INDEX idusuarios_UNIQUE (idusuarios ASC),
  UNIQUE INDEX email_UNIQUE (email ASC)
);

CREATE TABLE spotmusic.musicas (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  arquivo VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

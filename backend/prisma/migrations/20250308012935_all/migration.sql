-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MASTER';

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Funcao" (
    "id_funcao" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Funcao_pkey" PRIMARY KEY ("id_funcao")
);

-- CreateTable
CREATE TABLE "UsuarioFuncao" (
    "fk_id_usuario" INTEGER NOT NULL,
    "fk_id_funcao" INTEGER NOT NULL,

    CONSTRAINT "UsuarioFuncao_pkey" PRIMARY KEY ("fk_id_usuario","fk_id_funcao")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id_curso" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "FuncaoCurso" (
    "fk_id_funcao" INTEGER NOT NULL,
    "fk_id_curso" INTEGER NOT NULL,

    CONSTRAINT "FuncaoCurso_pkey" PRIMARY KEY ("fk_id_funcao","fk_id_curso")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id_aula" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "url_video" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "fk_id_curso" INTEGER NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id_aula")
);

-- CreateTable
CREATE TABLE "CursosConcluidos" (
    "id_concluidos" SERIAL NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,
    "fk_id_aula" INTEGER NOT NULL,
    "completado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CursosConcluidos_pkey" PRIMARY KEY ("id_concluidos")
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id_certificado" SERIAL NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,
    "fk_id_curso" INTEGER NOT NULL,
    "data_emissao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url_certificado" TEXT NOT NULL,

    CONSTRAINT "Certificado_pkey" PRIMARY KEY ("id_certificado")
);

-- CreateTable
CREATE TABLE "Prova" (
    "id_prova" SERIAL NOT NULL,
    "fk_id_curso" INTEGER NOT NULL,
    "nota_minima" DOUBLE PRECISION NOT NULL,
    "total_perguntas" INTEGER NOT NULL,

    CONSTRAINT "Prova_pkey" PRIMARY KEY ("id_prova")
);

-- CreateTable
CREATE TABLE "TentativasProva" (
    "id_tentativa_prova" SERIAL NOT NULL,
    "fk_id_funcionario" INTEGER NOT NULL,
    "fk_id_prova" INTEGER NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "data_tentativa" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passou" BOOLEAN NOT NULL,

    CONSTRAINT "TentativasProva_pkey" PRIMARY KEY ("id_tentativa_prova")
);

-- CreateTable
CREATE TABLE "LiberacaoCurso" (
    "id_liberacao_curso" SERIAL NOT NULL,
    "fk_id_funcionario" INTEGER NOT NULL,
    "fk_id_curso" INTEGER NOT NULL,
    "fk_id_admin" INTEGER NOT NULL,
    "data_liberacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiberacaoCurso_pkey" PRIMARY KEY ("id_liberacao_curso")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prova_fk_id_curso_key" ON "Prova"("fk_id_curso");

-- AddForeignKey
ALTER TABLE "UsuarioFuncao" ADD CONSTRAINT "UsuarioFuncao_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioFuncao" ADD CONSTRAINT "UsuarioFuncao_fk_id_funcao_fkey" FOREIGN KEY ("fk_id_funcao") REFERENCES "Funcao"("id_funcao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuncaoCurso" ADD CONSTRAINT "FuncaoCurso_fk_id_funcao_fkey" FOREIGN KEY ("fk_id_funcao") REFERENCES "Funcao"("id_funcao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuncaoCurso" ADD CONSTRAINT "FuncaoCurso_fk_id_curso_fkey" FOREIGN KEY ("fk_id_curso") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_fk_id_curso_fkey" FOREIGN KEY ("fk_id_curso") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursosConcluidos" ADD CONSTRAINT "CursosConcluidos_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursosConcluidos" ADD CONSTRAINT "CursosConcluidos_fk_id_aula_fkey" FOREIGN KEY ("fk_id_aula") REFERENCES "Aula"("id_aula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_fk_id_curso_fkey" FOREIGN KEY ("fk_id_curso") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prova" ADD CONSTRAINT "Prova_fk_id_curso_fkey" FOREIGN KEY ("fk_id_curso") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TentativasProva" ADD CONSTRAINT "TentativasProva_fk_id_funcionario_fkey" FOREIGN KEY ("fk_id_funcionario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TentativasProva" ADD CONSTRAINT "TentativasProva_fk_id_prova_fkey" FOREIGN KEY ("fk_id_prova") REFERENCES "Prova"("id_prova") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiberacaoCurso" ADD CONSTRAINT "LiberacaoCurso_fk_id_funcionario_fkey" FOREIGN KEY ("fk_id_funcionario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiberacaoCurso" ADD CONSTRAINT "LiberacaoCurso_fk_id_curso_fkey" FOREIGN KEY ("fk_id_curso") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiberacaoCurso" ADD CONSTRAINT "LiberacaoCurso_fk_id_admin_fkey" FOREIGN KEY ("fk_id_admin") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
